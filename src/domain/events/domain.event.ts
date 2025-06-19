import { idService } from "../config/id-service";
import { CustomerEventName } from "./customer-events";

export interface DomainEventProps<DataDto = any> {
  aggregateId: string;
  data: DataDto;
}

export const DomainEventType = {
  DOMAIN_EVENT: "domain-event",
  CUSTOMER: "customer",
  ORDER: "order",
  ORDER_ITEM: "order-item",
  PRODUCT: "product",
} as const;

export type DomainEventType =
  (typeof DomainEventType)[keyof typeof DomainEventType];
export type DomainEventName = CustomerEventName;

export class DomainEvent<DataDto = any> {
  protected readonly _occurredOn = new Date();
  protected readonly _eventId = idService.generate();
  protected _type: DomainEventType = DomainEventType.DOMAIN_EVENT;

  protected constructor(
    private readonly _name: DomainEventName,
    private readonly _props: DomainEventProps<DataDto>
  ) {}

  // public methods
  public toJSON() {
    return {
      eventId: this._eventId,
      aggregateId: this._props.aggregateId,
      name: this._name,
      data: this._props.data,
      occurredOn: this._occurredOn.toISOString(),
    };
  }

  // getters
  get name() {
    return this._name;
  }
  get aggregateId() {
    return this._props.aggregateId;
  }
  get data(): DataDto {
    return this._props.data;
  }
  get occurredOn() {
    return this._occurredOn;
  }
  get eventId() {
    return this._eventId;
  }
  get type() {
    return this._type;
  }
}
