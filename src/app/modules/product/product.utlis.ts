import { TProduct } from './product.interface';

export type TQuery = {
  category?: string;
  sort?: string;
  search?: string;
  price?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};

export type TOrder = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderItems: [TProduct];
};
