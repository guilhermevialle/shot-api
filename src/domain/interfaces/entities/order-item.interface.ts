import { z } from "zod";
import { idSchema } from "../shared/id.interface";

export const defaultOrderItemSchema = z.object({
  id: idSchema("OrderItem").optional(),
});

export const createOrderItemSchema = z.object({
  orderId: idSchema("Order"),
  productId: idSchema("Product"),
  name: z.string(),
  quantity: z.number(),
  unitPriceInCents: z.number(),
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
