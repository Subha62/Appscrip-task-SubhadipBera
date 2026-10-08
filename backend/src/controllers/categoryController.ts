import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return res.json({
      categories,
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);

    return res.status(500).json({
      error: {
        code: "CATEGORY_FETCH_FAILED",
        message: "Failed to fetch categories",
      },
    });
  }
};