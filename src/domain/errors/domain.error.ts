export enum DomainErrorCode {
  INVALID_INPUT = "INVALID_INPUT",
}

export enum DomainErrorStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

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
