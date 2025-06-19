import { idService } from "../config/id-service";
import { InvalidInputError } from "../errors/shared";
import { CustomerCreatedEvent } from "../events/customer-events/customer-created.event";
import { DomainEvent } from "../events/domain.event";
import {
  CreateCustomerProps,
  createCustomerSchema,
  CustomerProps,
  RestoreCustomerProps,
  restoreCustomerSchema,
} from "../interfaces/entities/customer.interface";

export class Customer {
  private _events: DomainEvent[] = [];
  private props: RestoreCustomerProps;

  private constructor(props: CustomerProps) {
    this.props = {
      ...props,
      id: props.id ?? idService.generate(),
    };
  }

  private addEvent(event: DomainEvent) {
    this._events.push(event);
  }

  static create(props: CreateCustomerProps) {
    const result = createCustomerSchema.safeParse(props);

    if (!result.success)
      throw new InvalidInputError(
        `[Customer:create] ${result.error.errors[0].message}`
      );

    const customer = new Customer(props);

    customer.addEvent(
      new CustomerCreatedEvent({
        aggregateId: customer.id,
        data: {
          id: customer.id,
          username: customer.username,
        },
      })
    );

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
  public pullEvents() {
    const events = this._events;
    this._events = [];
    return events;
  }

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
