export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  featured: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
};

export type Order = {
  number: string;
  customer: Customer;
  items: CartItem[];
  total: number;
};

export type StoreRoute = "home" | "products" | "detail" | "cart" | "checkout";
