"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const order_model_1 = __importDefault(require("../order/order.model"));
const createProductInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(payload);
    return result;
});
const getAllProductInToDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, sort, search, price, page = 1, limit = 6 } = query;
    const queryObject = {};
    if (category) {
        queryObject.category = category;
    }
    if (search) {
        queryObject.$or = [
            { title: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
        ];
    }
    let result = product_model_1.default.find(queryObject);
    if (sort === 'price') {
        result = result.sort({ price: price === 'asc' ? 1 : -1 });
    }
    else if (sort === 'name') {
        result = result.sort({ title: 1 });
    }
    const avoid = (page - 1) * limit;
    const products = yield result.skip(avoid).limit(limit).exec();
    const total_products = yield product_model_1.default.countDocuments(queryObject);
    return { data: products, total_products };
});
const getSingleProductFromDB = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(param);
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(id);
    return result;
});
const updateProductInToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    return result;
});
const productAvailablilityCheckInToDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    if ((result === null || result === void 0 ? void 0 : result.quantity) <= 0) {
        throw new Error('Not Available');
    }
    return result;
});
const orderCreateInToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const detailedOrderItems = yield Promise.all(payload.orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(item._id);
        if (!product) {
            throw new Error('Product is not found');
        }
        if (product.quantity < item.quantity) {
            throw new Error('Stock Out!!');
        }
        //  quantity update
        product.quantity -= item.quantity;
        yield product.save();
        return {
            _id: product._id,
            title: product.title,
            price: product.price,
            quantity: item.quantity,
            image: product.image,
            category: product.category,
        };
    })));
    const order = yield order_model_1.default.create({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        orderItems: detailedOrderItems,
    });
    return order;
});
exports.productServices = {
    createProductInToDB,
    getAllProductInToDB,
    deleteProductFromDB,
    getSingleProductFromDB,
    updateProductInToDB,
    productAvailablilityCheckInToDB,
    orderCreateInToDB,
};
