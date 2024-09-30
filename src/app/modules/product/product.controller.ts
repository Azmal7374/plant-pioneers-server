import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse/sendResponse';
import { productServices} from './product.service';
import { TOrder } from './product.interface';

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.createProduct(req.body);

    sendResponse(res, result, 'Product is created succesfully');
  } catch (error) {
    next(error);
  }
};

const getAllProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.getAllProduct(req.query);

    sendResponse(res, result, 'Products fetched succesfully');
  } catch (error) {
    next(error);
  }
};

const getSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.getSingleProduct(req.params.id);

    sendResponse(res, result, 'Products fetched succesfully');
  } catch (error) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.deleteProduct(req.query.id as string);

    sendResponse(res, result, 'Product deleted succesfully');
  } catch (error) {
    next(error);
  }
};

const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.updateProduct(
      req.query.id as string,
      req.body,
    );

    sendResponse(res, result, 'Product updated succesfully!');
  } catch (error) {
    next(error);
  }
};

const checkAvailabilityOfProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.checkAvailabilityOfProduct(
      req.query.id as string,
    );

    sendResponse(res, result, 'Product updated succesfully!');
  } catch (error) {
    next(error);
  }
};

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.createOrder(req.body as TOrder);

    sendResponse(res, result, 'Order created succesfully!');
  } catch (error) {
    next(error);
  }
};

export const productControllers = {
  createProduct,
  getAllProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  checkAvailabilityOfProduct,
  createOrder,
};