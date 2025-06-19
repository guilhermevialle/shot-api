import { CustomerEventName } from ".";
import { DomainEvent, DomainEventProps } from "../domain.event";

interface CustomerCreatedDto {
  id: string;
  username: string;
}

export class CustomerCreatedEvent extends DomainEvent<CustomerCreatedDto> {
  constructor(props: DomainEventProps<CustomerCreatedDto>) {
    super(CustomerEventName.CREATED, props);
  }
}
