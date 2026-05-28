import productsData from "@/data/products.json";
import type { Product } from "@/data/types";

/**
 * Single source for product data access.
 * Today it reads from local JSON, tomorrow it can switch to API/DB
 * without impacting UI components like ProductCard.
 */
export async function getProducts(): Promise<Product[]> {
  // JSON includes comment rows used for readability.
  return (productsData as any[]).filter((p) => p?.id !== undefined) as Product[];
}
