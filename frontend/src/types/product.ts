export interface ProductImage {
  id: number;
  url: string;
  altText: string;
  productId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  categoryId: number;
  rating: number | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  images: ProductImage[];
}

export interface ProductPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProductResponse {
  products: Product[];
  pagination: ProductPagination;
}

export interface CategoryResponse {
  categories: Category[];
}