import { InvalidInputError } from "@/domain/errors/shared";

try {
  throw new InvalidInputError("Date must be like...");
} catch (error) {
  if (error instanceof InvalidInputError) {
    console.log(error.toJSON());
  }
}
