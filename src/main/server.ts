import { InvalidInputError } from "@/domain/errors/shared";
import { CustomerCreatedEvent } from "@/domain/events/customer-events/customer-created.event";

try {
  const event = new CustomerCreatedEvent({
    aggregateId: "1",
    data: {
      id: "1",
      username: "test",
    },
  });

  console.log(event.toJSON());
} catch (error) {
  if (error instanceof InvalidInputError) {
    console.log(error.toJSON());
  }
}
