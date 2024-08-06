"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductSchema = void 0;
const zod_1 = require("zod");
const productValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        category: zod_1.z.string(),
        image: zod_1.z.string(),
        quantity: zod_1.z.number(),
        price: zod_1.z.number().positive('Price must be a positive number'),
        rating: zod_1.z
            .number()
            .min(0, 'Rating must be at least 0')
            .max(5, 'Rating must be at most 5'),
    }),
});
const productUpdateValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        price: zod_1.z.number().positive('Price must be a positive number').optional(),
        rating: zod_1.z
            .number()
            .min(0, 'Rating must be at least 0')
            .max(5, 'Rating must be at most 5')
            .optional(),
    }),
});
exports.validateProductSchema = {
    productValidation,
    productUpdateValidation,
};
