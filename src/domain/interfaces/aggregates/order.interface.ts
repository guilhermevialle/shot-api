import { z } from "zod";

export const defaultOrderSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createOrderSchema = z.object({
  customerId: z.string(),
});

export const restoreOrderSchema = defaultOrderSchema
  .required()
  .merge(createOrderSchema);

export const orderSchema = defaultOrderSchema.merge(createOrderSchema);

export type CreateOrderProps = z.infer<typeof createOrderSchema>;
export type RestoreOrderProps = z.infer<typeof restoreOrderSchema>;
export type OrderProps = z.infer<typeof orderSchema>;
