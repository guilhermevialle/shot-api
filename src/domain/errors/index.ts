// Domain Error Codes (related to business rules)
export const DomainErrorCode = {
  INVALID_INPUT: "INVALID_INPUT",
} as const;

export type DomainErrorCode =
  (typeof DomainErrorCode)[keyof typeof DomainErrorCode];

// Domain Error Status (related to HTTP status codes)
export const DomainErrorStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type DomainErrorStatus =
  (typeof DomainErrorStatus)[keyof typeof DomainErrorStatus];
