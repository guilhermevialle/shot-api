import { z } from "zod";
import { idSchema } from "../shared/id.interface";

export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const defaultOrderSchema = z.object({
  id: idSchema("Order").optional(),
  createdAt: z.date({
    invalid_type_error: "Order created at must be a date",
    required_error: "Order created at is required",
  }).optional(),
  updatedAt: z.date({
    invalid_type_error: "Order updated at must be a date",
    required_error: "Order updated at is required",
  }).optional(),
  status: z.nativeEnum(OrderStatus, {
    invalid_type_error: "Order status must be a string",
    required_error: "Order status is required",
  }).optional(),
});

export const createOrderSchema = z.object({
  customerId: idSchema("Customer"),
});

export const restoreOrderSchema = defaultOrderSchema
  .required()
  .merge(createOrderSchema);

export const orderSchema = defaultOrderSchema.merge(createOrderSchema);

export type CreateOrderProps = z.infer<typeof createOrderSchema>;
export type RestoreOrderProps = z.infer<typeof restoreOrderSchema>;
export type OrderProps = z.infer<typeof orderSchema>;
