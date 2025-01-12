export interface Product {
  id?: any;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  quantity?: number;
  user?: string;
  product_id: number;
}
