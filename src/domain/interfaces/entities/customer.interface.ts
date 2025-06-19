import { z } from "zod";

export const defaultCustomerSchema = z.object({
  id: z.string().optional(),
});

export const createCustomerSchema = z.object({
  username: z.string(),
});

export const restoreCustomerSchema = defaultCustomerSchema
  .required()
  .merge(createCustomerSchema);

export const customerSchema = defaultCustomerSchema.merge(createCustomerSchema);

export type CreateCustomerProps = z.infer<typeof createCustomerSchema>;
export type RestoreCustomerProps = z.infer<typeof restoreCustomerSchema>;
export type CustomerProps = z.infer<typeof customerSchema>;
