import { z } from "zod";
import { idSchema } from "../shared/id.interface";

export const defaultCustomerSchema = z.object({
  id: idSchema("Customer").optional(),
});

export const createCustomerSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Username must be a string",
      required_error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
});

export const restoreCustomerSchema = defaultCustomerSchema
  .required()
  .merge(createCustomerSchema);

export const customerSchema = defaultCustomerSchema.merge(createCustomerSchema);

export type CreateCustomerProps = z.infer<typeof createCustomerSchema>;
export type RestoreCustomerProps = z.infer<typeof restoreCustomerSchema>;
export type CustomerProps = z.infer<typeof customerSchema>;
