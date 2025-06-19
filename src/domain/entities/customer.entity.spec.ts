import { describe, expect, it } from "vitest";
import { Customer } from "./customer.entity";

describe("Customer Entity", () => {
  describe("Create, restore", () => {
    it("should create a customer by default props", () => {
      const customer = Customer.create({ username: "John Doe" });

      expect(customer.id).toBeDefined();
    });

    it("should not create customer with invalid props", () => {
      expect(() => Customer.create({} as any)).toThrow();
      expect(() => Customer.create({ username: "Jo" })).toThrow();
    });

    it("should not restore customer with invalid props", () => {
      expect(() => Customer.restore({} as any)).toThrow();
      expect(() => Customer.restore({ id: "123" } as any)).toThrow();
      expect(() => Customer.restore({ username: "John doe" } as any)).toThrow();
      expect(() => Customer.restore({ username: "Jo", id: "123" })).toThrow();
    });

    it("should restore a customer by all props", () => {
      const customer = Customer.restore({ id: "123", username: "John Doe" });

      expect(() => customer).not.toThrow();
      expect(customer.id).toBeDefined();
      expect(customer.username).toBeDefined();
    });
  });

  describe("toJSON", () => {
    it("should return a customer JSON", () => {
      const customer = Customer.create({ username: "John Doe" });

      expect(customer.toJSON()).toEqual({
        id: customer.id,
        username: customer.username,
      });
    });
  });

  describe("getters", () => {
    it("should return getters correctly", () => {
      const customer = Customer.create({ username: "John Doe" });
      expect(customer.id).toBeDefined();
      expect(customer.username).toBeDefined();
    });
  });
});
