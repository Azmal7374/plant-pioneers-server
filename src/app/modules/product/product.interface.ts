export type TProduct = {
  _id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  quantity: number;
};


export type TQuery = {
  category?: string;
  sortBy?: string;
  search?: string;
  priceOrder?: 'asc' | 'desc';
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
