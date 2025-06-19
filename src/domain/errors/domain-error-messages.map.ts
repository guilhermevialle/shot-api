import { DomainErrorCode } from "./domain.error";

export const domainErrorMessagesMap: Record<DomainErrorCode, string> = {
  [DomainErrorCode.INVALID_INPUT]: "Invalid input",
};
