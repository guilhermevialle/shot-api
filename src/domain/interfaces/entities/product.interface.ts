import { z } from "zod";

export const defaultProductSchema = z.object({
  id: z.string().optional(),
});

export const createProductSchema = z.object({
  name: z.string(),
  priceInCents: z.number(),
  description: z.string(),
  stockQuantity: z.number(),
  thumbnailUrl: z.string(),
});

export const restoreProductSchema = defaultProductSchema
  .required()
  .merge(createProductSchema);

export const productSchema = defaultProductSchema.merge(createProductSchema);

export type CreateProductProps = z.infer<typeof createProductSchema>;
export type RestoreProductProps = z.infer<typeof restoreProductSchema>;
export type ProductProps = z.infer<typeof productSchema>;
