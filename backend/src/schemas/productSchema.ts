import { z } from "zod";

export const productQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(50).default(6),

  category: z.string().trim().optional(),

  minPrice: z.coerce.number().min(0).optional(),

  maxPrice: z.coerce.number().min(0).optional(),

  sort: z
    .enum([
      "recommended",
      "price-asc",
      "price-desc",
      "rating",
      "newest",
    ])
    .default("recommended"),

  q: z.string().trim().optional(),
});

export const productIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});