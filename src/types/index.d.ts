type ProductType = {
  productId: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  keywords?: string[];
  categorySlug?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  stock?: number;
  createdAt?: string;
  updatedAt?: string;
};

type UserType = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
};

type CartItemType = {
  productId: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;
  name: string;
  description: string;
  discount?: number;
  userId: string;
};

export type { ProductType, UserType, CartItemType };
