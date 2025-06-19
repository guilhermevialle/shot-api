import { Customer } from "@/domain/entities/customer.entity";
import { InvalidInputError } from "@/domain/errors/shared";

function main() {
  try {
    const customer = Customer.create({ username: "guivialle" });

    console.log(customer);
  } catch (error) {
    if (error instanceof InvalidInputError) {
      console.log(error.toJSON());
    }
  }
}

main();
