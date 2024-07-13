/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery } from 'mongoose';
import ProductModel from './product.model';
import { TProduct } from './product.interface';

type TQuery = {
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

const createProductInToDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductInToDB = async (query: TQuery) => {
  const { category, sort, search, price, page = 1, limit = 4 } = query;
  const queryObject: FilterQuery<TProduct> = {};

  if (category) {
    queryObject.category = category;
  }

  if (search) {
    queryObject.$or = [
      { title: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  let result = ProductModel.find(queryObject);

  if (sort === 'price') {
    result = result.sort({ price: price === 'asc' ? 1 : -1 });
  } else if (sort === 'name') {
    result = result.sort({ title: 1 });
  }

  const avoid = (page - 1) * limit;
  const products = await result.skip(avoid).limit(limit).exec();
  const total_products = await ProductModel.countDocuments(queryObject);

  return { data: products,  total_products };
};

const getSingleProductFromDB = async (param: any) => {
  const result = await ProductModel.findById(param);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

const updateProductInToDB = async (id: string, payload: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    {$set: payload},
    {new: true, runValidators: true}
  );
  return result;
}

export const productServices = {
  createProductInToDB,
  getAllProductInToDB,
  deleteProductFromDB,
  getSingleProductFromDB,
  updateProductInToDB,

};