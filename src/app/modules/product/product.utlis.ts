import { TProduct } from "./product.interface";


export type TQuery = {
    category?: string;
    sort?: string;
    search?: string;
    price?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  };
  

  export type TOrder = {
    name: string;
    email: string;
    phone: string;
    address: string;
    orderItems: [TProduct];
  };