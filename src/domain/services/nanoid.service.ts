import { nanoid } from "nanoid";
import { z } from "zod";
import { IIdService } from "../interfaces/services/id-service.interface";

export const DEFAULT_ID_LENGTH = 21;
export const regex = /^[A-Za-z0-9_-]+$/;

export const idSchema = (length: number = DEFAULT_ID_LENGTH) =>
  z.string().length(length).regex(regex);

export class NanoIdService implements IIdService {
  private _length: number;

  /**
   * Creates a new NanoIdService instance that generates and validates IDs of the specified length.
   *
   * @param length - The desired length of the generated IDs. Defaults to 21.
   */
  constructor(length: number = DEFAULT_ID_LENGTH) {
    // default is 21
    this._length = length;
  }

  /**
   * Generates a new ID.
   *
   * @returns The generated ID.
   */
  public generate(): string {
    return nanoid(this._length);
  }

  /**
   * Validates the given ID.
   *
   * @param id - The ID to validate.
   * @returns Whether the ID is valid or not
   */
  public validate(id: string): boolean {
    return idSchema(this._length).safeParse(id).success;
  }

  get length() {
    return this._length;
  }
}
