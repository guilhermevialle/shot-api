import { z } from "zod";
import { idSchema } from "../shared/id.interface";

export const defaultOrderItemSchema = z.object({
  id: idSchema("OrderItem").optional(),
});

export const createOrderItemSchema = z.object({
  orderId: idSchema("Order"),
  productId: idSchema("Product"),
  name: z.string({
    invalid_type_error: "Product name must be a string",
    required_error: "Product name is required",
  }).min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name must be at most 100 characters long"),
  quantity: z.number({
    invalid_type_error: "Quantity must be a number",
    required_error: "Quantity is required",
  }).int('Quantity must be an integer').min(1, "Quantity must be at least 1"),
  unitPriceInCents: z.number({
    invalid_type_error: "Unit price must be a number",
    required_error: "Unit price is required",
  }).int('Unit price must be an integer').min(100, "Unit price must be at least 100 cents"),
});

export const restoreOrderItemSchema = defaultOrderItemSchema
  .required()
  .merge(createOrderItemSchema);

export const orderItemSchema = defaultOrderItemSchema.merge(
  createOrderItemSchema
);

export type CreateOrderItemProps = z.infer<typeof createOrderItemSchema>;
export type RestoreOrderItemProps = z.infer<typeof restoreOrderItemSchema>;
export type OrderItemProps = z.infer<typeof orderItemSchema>;
