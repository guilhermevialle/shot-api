import { DomainErrorCode, DomainErrorStatus } from ".";

interface DomainErrorProps {
  errorCode: DomainErrorCode;
  statusCode: DomainErrorStatus;
  details?: Record<string, unknown>;
}

export class DomainError extends Error {
  private _message: string;
  private props: DomainErrorProps;

  constructor(message: string, props: DomainErrorProps) {
    super(message);

    Error.captureStackTrace?.(this, this.constructor);
    this._message = message;
    this.props = props;
    this.name = this.constructor.name;
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this.props.statusCode;
  }

  get errorCode() {
    return this.props.errorCode;
  }

  get details() {
    return this.props.details;
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
