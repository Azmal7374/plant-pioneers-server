import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse/sendResponse';
import { productServices} from './product.service';
import httpStatus from 'http-status';
import { TOrder } from './product.utlis';

const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.createProductInToDB(req.body);
    //  console.log(result)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is created succesfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.getAllProductInToDB(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Product Fetched succesfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};




const getSingleProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.getSingleProductFromDB(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Product Fetched succesfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.deleteProductFromDB(req.query.id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is Deleted succesfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.updateProductInToDB(
      req.query.id as string,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product is  Updated succesfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



const checkAvailabilityOfProduct: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.productAvailablilityCheckInToDB(
      req.query.id as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Show Available Product!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const orderCreate: RequestHandler = async (req, res, next) => {
  try {
    const result = await productServices.orderCreateInToDB(req.body as TOrder);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order is Created succesfully!!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  checkAvailabilityOfProduct,
  orderCreate
};
