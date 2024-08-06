"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create-product', (0, validateRequest_1.default)(product_validation_1.validateProductSchema.productValidation), product_controller_1.productControllers.createProduct);
router.get('/', product_controller_1.productControllers.getAllProduct);
router.get('/:id', product_controller_1.productControllers.getSingleProduct);
router.delete('/delete-product', product_controller_1.productControllers.deleteProduct);
router.put('/update-product', (0, validateRequest_1.default)(product_validation_1.validateProductSchema.productUpdateValidation), product_controller_1.productControllers.updateProduct);
router.post('/check-availability', product_controller_1.productControllers.checkAvailabilityOfProduct);
router.post('/create-order', product_controller_1.productControllers.orderCreate);
exports.ProductRoutes = router;
