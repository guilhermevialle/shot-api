import { idService } from "../config/id-service";
import {
  CreateCustomerProps,
  CustomerProps,
  RestoreCustomerProps,
} from "../interfaces/entities/customer.interface";

export class Customer {
  private props: RestoreCustomerProps;

  private constructor(props: CustomerProps) {
    this.props = {
      ...props,
      id: props.id ?? idService.generate(),
    };
  }

  static create({ username }: CreateCustomerProps) {
    const customer = new Customer({
      username,
    });

    return customer;
  }

  static restore({ id, username }: RestoreCustomerProps) {
    return new Customer({
      id,
      username,
    });
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
