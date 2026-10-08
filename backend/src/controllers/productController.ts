import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  productIdSchema,
  productQuerySchema,
} from "../schemas/productSchema";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = productQuerySchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "INVALID_QUERY",
          message: "Invalid query parameters",
          details: result.error.flatten(),
        },
      });
    }

    const {
      page,
      limit,
      category,
      q,
      minPrice,
      maxPrice,
      sort,
    } = result.data;

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      return res.status(400).json({
        error: {
          code: "INVALID_PRICE_RANGE",
          message: "minPrice cannot be greater than maxPrice",
        },
      });
    }

    const where: any = {};

    if (category) {
      where.category = {
        name: category,
      };
    }

    if (q) {
      where.OR = [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: q,
            mode: "insensitive",
          },
        },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};

      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }

      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    let orderBy: any = {
      createdAt: "desc",
    };

    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;

      case "price-desc":
        orderBy = { price: "desc" };
        break;

      case "rating":
        orderBy = { rating: "desc" };
        break;

      case "newest":
        orderBy = { createdAt: "desc" };
        break;

      case "recommended":
      default:
        orderBy = { createdAt: "desc" };
        break;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        include: {
          category: true,
          images: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),

      prisma.product.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return res.status(500).json({
      error: {
        code: "PRODUCT_FETCH_FAILED",
        message: "Failed to fetch products",
      },
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const result = productIdSchema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "INVALID_PRODUCT_ID",
          message: "Invalid product ID",
        },
      });
    }

    const { id } = result.data;

    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        images: true,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: {
          code: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        },
      });
    }

    return res.json({
      product,
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);

    return res.status(500).json({
      error: {
        code: "PRODUCT_FETCH_FAILED",
        message: "Failed to fetch product",
      },
    });
  }
};