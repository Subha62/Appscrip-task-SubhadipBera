import type {
  CategoryResponse,
  ProductResponse,
} from "../types/product";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function getProducts(
  searchParams: string = "",
): Promise<ProductResponse> {
  const url = `${API_URL}/products${
    searchParams ? `?${searchParams}` : ""
  }`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getCategories(): Promise<CategoryResponse> {
  const response = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}