import { z } from "zod";
import { idSchema } from "../shared/id.interface";

export const defaultProductSchema = z.object({
  id: idSchema("Product").optional(),
});

export const createProductSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Product name must be a string",
      required_error: "Product name is required",
    })
    .min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name must be at most 100 characters long"),
  priceInCents: z
    .number({
      invalid_type_error: "Product price must be a number",
      required_error: "Product price is required",
    }).int('Product price must be an integer')
    .min(100, "Product price must be at least 100 cents"),
  description: z
    .string({
      invalid_type_error: "Product description must be a string",
      required_error: "Product description is required",
    })
    .min(8, "Product description must be at least 8 characters long")
    .max(600, "Product description must be at most 600 characters long"),
  stockQuantity: z
    .number({
      invalid_type_error: "Product stock quantity must be a number",
      required_error: "Product stock quantity is required",
    }).int('Product stock quantity must be an integer')
    .nonnegative({
      message: "Product stock quantity cannot be negative",
    }),
  thumbnailUrl: z
    .string({
      invalid_type_error: "Product thumbnail URL must be a string",
      required_error: "Product thumbnail URL is required",
    })
    .url("Product thumbnail URL must be a valid URL"),
});

export const restoreProductSchema = defaultProductSchema
  .required()
  .merge(createProductSchema);

export const productSchema = defaultProductSchema.merge(createProductSchema);

export type CreateProductProps = z.infer<typeof createProductSchema>;
export type RestoreProductProps = z.infer<typeof restoreProductSchema>;
export type ProductProps = z.infer<typeof productSchema>;
