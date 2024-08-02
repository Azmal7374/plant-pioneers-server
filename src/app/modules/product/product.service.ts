/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery } from 'mongoose';
import ProductModel from './product.model';
import { TProduct } from './product.interface';
import OrderModel from '../order/order.model';
import { TOrder, TQuery } from './product.utlis';

const createProductInToDB = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductInToDB = async (query: TQuery) => {
  const { category, sort, search, price, page = 1, limit = 6 } = query;
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

  return { data: products, total_products };
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
    { $set: payload },
    { new: true, runValidators: true },
  );
  return result;
};

const productAvailablilityCheckInToDB = async (id: string) => {
  const result = await ProductModel.findById(id);

  if ((result?.quantity as number) <= 0) {
    throw new Error('Not Available');
  }

  return result;
};

const orderCreateInToDB = async (payload: TOrder) => {
  const detailedOrderItems = await Promise.all(
    payload.orderItems.map(async (item) => {
      const product = await ProductModel.findById(item._id);
      if (!product) {
        throw new Error('Product is not found');
      }

      if (product.quantity < item.quantity) {
        throw new Error('Stock Out!!');
      }

      //  quantity update
      product.quantity -= item.quantity;
      await product.save();

      return {
        _id: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
        category: product.category,
      };
    }),
  );

  const order = await OrderModel.create({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    address: payload.address,
    orderItems: detailedOrderItems,
  });

  return order;
};

export const productServices = {
  createProductInToDB,
  getAllProductInToDB,
  deleteProductFromDB,
  getSingleProductFromDB,
  updateProductInToDB,
  productAvailablilityCheckInToDB,
  orderCreateInToDB,
};
