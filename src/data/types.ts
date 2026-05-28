/**
 * Product data model.
 * Mirrors the shape of each entry in products.json.
 * Designed to be reusable when transitioning to API/backend.
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}
