import { z } from "zod";

export const idSchema = (name: string = "") =>
  z
    .string({
      invalid_type_error: `${name} ID must be a string`,
      required_error: `${name} ID is required`,
    })
    .min(1, `${name} ID must be at least 1 character long`)
    .max(36, `${name} ID must be at most 36 characters long`);
