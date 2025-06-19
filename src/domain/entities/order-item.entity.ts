import { idService } from "../config/id-service";
import { InvalidInputError } from "../errors/shared";
import {
  CreateOrderItemProps,
  createOrderItemSchema,
  OrderItemProps,
  RestoreOrderItemProps,
  restoreOrderItemSchema,
} from "../interfaces/entities/order-item.interface";

export class OrderItem {
  private props: RestoreOrderItemProps;

  private constructor(props: OrderItemProps) {
    this.props = {
      ...props,
      id: props.id ?? idService.generate(),
    };
  }

  static create(props: CreateOrderItemProps) {
    const result = createOrderItemSchema.safeParse(props);

    if (!result.success)
      throw new InvalidInputError(
        `[OrderItem:create] ${result.error.errors[0].message}`
      );

    const orderItem = new OrderItem({ ...props });

    return orderItem;
  }

  static restore(props: RestoreOrderItemProps) {
    const result = restoreOrderItemSchema.safeParse(props);

    if (!result.success)
      throw new InvalidInputError(
        `[OrderItem:restore] ${result.error.errors[0].message}`
      );

    return new OrderItem({ ...props });
  }

  // public methods
  public incrementQuantity(amount: number) {
    this.props.quantity += amount;
  }

  public toJSON() {
    return {
      id: this.id,
      orderId: this.orderId,
      productId: this.productId,
      name: this.name,
      quantity: this.quantity,
      unitPriceInCents: this.unitPriceInCents,
      totalPriceInCents: this.totalPriceInCents,
    };
  }

  // getters
  get id() {
    return this.props.id;
  }
  get orderId() {
    return this.props.orderId;
  }
  get productId() {
    return this.props.productId;
  }
  get name() {
    return this.props.name;
  }
  get quantity() {
    return this.props.quantity;
  }
  get unitPriceInCents() {
    return this.props.unitPriceInCents;
  }

  // derived getters
  get totalPriceInCents() {
    return this.quantity * this.unitPriceInCents;
  }
}
