export const CustomerEventName = {
  CREATED: "customer.created",
} as const;

export type CustomerEventName =
  (typeof CustomerEventName)[keyof typeof CustomerEventName];
