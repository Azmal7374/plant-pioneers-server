import { z } from 'zod';

const productValidation = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.string(),
    quantity: z.number(),
    price: z.number().positive('Price must be a positive number'),
    rating: z
      .number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating must be at most 5'),
  }),
});

const productUpdateValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    quantity: z.number().optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    rating: z
      .number()
      .min(0, 'Rating must be at least 0')
      .max(5, 'Rating must be at most 5')
      .optional(),
  }),
});

export const validateProductSchema = {
  productValidation,
  productUpdateValidation,
};
