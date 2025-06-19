import { z } from "zod";

export const defaultOrderItemSchema = z.object({
  id: z.string().optional(),
});

export const createOrderItemSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
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
