/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery } from 'mongoose';
import ProductModel from './product.model';
import OrderModel from '../order/order.model';
import { TOrder, TProduct, TQuery } from './product.interface';


const createProduct = async (payload: TProduct) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProduct = async (query: TQuery) => {
  const { category, sortBy, search, priceOrder, page = 1, limit = 6 } = query;
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

  if (sortBy === 'price') {
    result = result.sort({ price: priceOrder === 'asc' ? 1 : -1 });
  } else if (sortBy === 'name') {
    result = result.sort({ title: 1 });
  }

  const skip = (page - 1) * limit;
  const products = await result.skip(skip).limit(limit).exec();
  const total = await ProductModel.countDocuments(queryObject);

  return { data: products, total };
};

const getSingleProduct = async (param: any) => {
  const result = await ProductModel.findById(param);
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

const updateProduct = async (id: string, payload: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );
  return result;
};

const checkAvailabilityOfProduct = async (id: string) => {
  const result = await ProductModel.findById(id);

  if ((result?.quantity as number) <= 0) {
    throw new Error('Not Available');
  }

  return result;
};

const createOrder = async (payload: TOrder) => {
  // Prepare detailed order items
  const detailedOrderItems = await Promise.all(
    payload.orderItems.map(async (item) => {
      const product = await ProductModel.findById(item._id);
      if (!product) {
        throw new Error(`Product with id ${item._id} not found`);
      }

      // Check if the quantity requested is available
      if (product.quantity < item.quantity) {
        throw new Error(`Not enough quantity for product ${product.title}`);
      }

      // Update the available quantity
      product.quantity -= item.quantity;
      await product.save();

      // Return the detailed order item
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

  // Create the order with the detailed items
  const order = await OrderModel.create({
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    customerAddress: payload.customerAddress,
    orderItems: detailedOrderItems,
  });

  return order;
};

export const productServices = {
  createProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  checkAvailabilityOfProduct,
  createOrder,
};