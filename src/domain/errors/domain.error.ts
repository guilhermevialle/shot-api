import { DomainErrorCode, DomainErrorStatus } from ".";

interface DomainErrorProps {
  errorCode: DomainErrorCode;
  statusCode: DomainErrorStatus;
  details?: Record<string, unknown>;
}

export class DomainError extends Error {
  constructor(
    private readonly _message: string,
    private readonly _props: DomainErrorProps
  ) {
    super(_message);

    Error.captureStackTrace?.(this, this.constructor);
    this.name = this.constructor.name;
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this._props.statusCode;
  }

  get errorCode() {
    return this._props.errorCode;
  }

  get details() {
    return this._props.details;
  }

  public toJSON() {
    return {
      message: this.message,
      errorCode: this.errorCode,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}
