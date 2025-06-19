import { idService } from "../config/id-service";
import { InvalidInputError } from "../errors/shared";
import {
  CreateCustomerProps,
  createCustomerSchema,
  CustomerProps,
  RestoreCustomerProps,
  restoreCustomerSchema,
} from "../interfaces/entities/customer.interface";

export class Customer {
  private props: RestoreCustomerProps;

  private constructor(props: CustomerProps) {
    this.props = {
      ...props,
      id: props.id ?? idService.generate(),
    };
  }

  static create(props: CreateCustomerProps) {
    const result = createCustomerSchema.safeParse(props);

    if (!result.success)
      throw new InvalidInputError(
        `[Customer:create] ${result.error.errors[0].message}`
      );

    const customer = new Customer(props);

    return customer;
  }

  static restore(props: RestoreCustomerProps) {
    const result = restoreCustomerSchema.safeParse(props);

    if (!result.success)
      throw new InvalidInputError(
        `[Customer:restore] ${result.error.errors[0].message}`
      );

    return new Customer(props);
  }

  // public methods
  public toJSON() {
    return {
      id: this.id,
      username: this.username,
    };
  }

  // getters
  get id() {
    return this.props.id;
  }
  get username() {
    return this.props.username;
  }
}

Customer.create({
  username: "John Doe",
});
