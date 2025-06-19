import { InvalidInputError } from "@/domain/errors/shared";

function main() {
  try {

  } catch (error) {
    if (error instanceof InvalidInputError) {
      console.log(error.toJSON());
    }
  }
}

main();
