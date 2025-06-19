import { InvalidInputError } from "@/domain/errors/shared";

try {
} catch (error) {
  if (error instanceof InvalidInputError) {
    console.log(error.toJSON());
  }
}
