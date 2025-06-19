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
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.nativeEnum(OrderStatus).optional(),
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
