import { idService } from "@/domain/config/id-service";
import { z } from "zod";

export const idSchema = (name: string = "") =>
  z
    .string({
      invalid_type_error: `${name} ID must be a string`,
      required_error: `${name} ID is required`,
    })
    .length(
      idService.length,
      `${name} ID must be exactly ${idService.length} character long`
    );
