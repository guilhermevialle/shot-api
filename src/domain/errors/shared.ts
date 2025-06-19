import { domainErrorMessagesMap } from "./domain-error-messages.map";
import {
  DomainError,
  DomainErrorCode,
  DomainErrorStatus,
} from "./domain.error";

const errorMessage = domainErrorMessagesMap[DomainErrorCode.INVALID_INPUT];

export class InvalidInputError extends DomainError {
  constructor(message: string = errorMessage) {
    super(message, {
      statusCode: DomainErrorStatus.BAD_REQUEST,
      errorCode: DomainErrorCode.INVALID_INPUT,
    });
  }
}
