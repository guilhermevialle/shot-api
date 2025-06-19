import { idService } from "../config/id-service";
import { OrderItem } from "../entities/order-item.entity";
import {
  CreateOrderProps,
  OrderProps,
  OrderStatus,
  RestoreOrderProps,
} from "../interfaces/aggregates/order.interface";

interface ItemProps {
  productId: string;
  quantity: number;
  name: string;
  unitPriceInCents: number;
}

export class Order {
  private props: RestoreOrderProps;
  private _items: OrderItem[] = [];

  private constructor(props: OrderProps) {
    this.props = {
      ...props,
      id: props.id ?? idService.generate(),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      status: props.status ?? OrderStatus.PENDING,
    };
  }

  static create(props: CreateOrderProps) {
    const order = new Order({ ...props });

    return order;
  }

  static restore(props: RestoreOrderProps) {
    return new Order({ ...props });
  }

  // private methods
  private touch() {
    this.props.updatedAt = new Date();
  }

  private hasItem(productId: string) {
    return this._items.some((item) => item.productId === productId);
  }

  // public methods
  public addItem(props: ItemProps) {
    if (this.hasItem(props.productId)) return;

    const item = OrderItem.create({
      orderId: this.id,
      productId: props.productId,
      name: props.name,
      quantity: props.quantity,
      unitPriceInCents: props.unitPriceInCents,
    });

    this._items.push(item);
    this.touch();
  }

  public toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      items: [...this.items.map((item) => item.toJSON())],
      totalPriceInCents: this.totalPriceInCents,
    };
  }

  // getters
  get id() {
    return this.props.id;
  }
  get customerId() {
    return this.props.customerId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get items() {
    return [...this._items];
  }
  get status() {
    return this.props.status;
  }

  // derived getters
  get totalPriceInCents() {
    return this._items.reduce((acc, item) => acc + item.totalPriceInCents, 0);
  }
}
