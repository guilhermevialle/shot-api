import { CustomerEventName } from "./customer-events";

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
