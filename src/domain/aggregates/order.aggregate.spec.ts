// order.spec.ts
import { describe, expect, it } from "vitest";
import { OrderStatus } from "../interfaces/aggregates/order.interface";
import { Order } from "./order.aggregate";

describe("Order Aggregate", () => {
  describe("Create, restore", () => {
    it("should create an order with valid props", () => {
      const order = Order.create({
        customerId: "customer-123",
      });

      expect(order.id).toBeDefined();
      expect(order.status).toBe("PENDING");
    });

    it("should not create order with invalid props", () => {
      expect(() => Order.create({} as any)).toThrow();
      expect(() => Order.create({ customerId: "" } as any)).toThrow();
    });

    it("should restore an order with all props", () => {
      const order = Order.restore({
        id: "order-001",
        customerId: "customer-123",
        createdAt: new Date(),
        updatedAt: new Date(),
        status: OrderStatus.SHIPPED,
      });

      expect(order.id).toBe("order-001");
      expect(order.status).toBe("SHIPPED");
    });

    it("should not restore order with invalid props", () => {
      expect(() => Order.restore({} as any)).toThrow();
      expect(() =>
        Order.restore({
          id: "",
          customerId: "",
          createdAt: "not-a-date",
          updatedAt: null,
          status: "INVALID",
        } as any)
      ).toThrow();
    });
  });

  describe("addItem", () => {
    it("should add a new item to order", () => {
      const order = Order.create({ customerId: "customer-1" });

      order.addItem({
        productId: "product-1",
        quantity: 2,
        name: "Test Product",
        unitPriceInCents: 1000,
      });

      expect(order.items.length).toBe(1);
      expect(order.items[0].productId).toBe("product-1");
    });

    it("should not add duplicate product to order", () => {
      const order = Order.create({ customerId: "customer-1" });

      order.addItem({
        productId: "product-1",
        quantity: 2,
        name: "Product A",
        unitPriceInCents: 1500,
      });

      order.addItem({
        productId: "product-1",
        quantity: 5,
        name: "Product A",
        unitPriceInCents: 1500,
      });

      expect(order.items.length).toBe(1);
    });
  });

  describe("toJSON", () => {
    it("should return a valid order JSON", () => {
      const order = Order.create({ customerId: "customer-1" });

      order.addItem({
        productId: "product-1",
        quantity: 1,
        name: "Product",
        unitPriceInCents: 2000,
      });

      const json = order.toJSON();

      expect(json).toMatchObject({
        id: order.id,
        customerId: order.customerId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        totalPriceInCents: 2000,
      });

      expect(Array.isArray(json.items)).toBe(true);
      expect(json.items[0]).toMatchObject({
        productId: "product-1",
        quantity: 1,
        unitPriceInCents: 2000,
      });
    });
  });

  describe("getters", () => {
    it("should expose all getters correctly", () => {
      const order = Order.create({ customerId: "customer-123" });

      expect(order.id).toBeDefined();
      expect(order.customerId).toBe("customer-123");
      expect(order.createdAt).toBeInstanceOf(Date);
      expect(order.updatedAt).toBeInstanceOf(Date);
      expect(order.status).toBe("PENDING");
      expect(order.items).toEqual([]);
    });
  });

  describe("derived getters", () => {
    it("should calculate totalPriceInCents correctly", () => {
      const order = Order.create({ customerId: "customer-123" });

      order.addItem({
        productId: "p1",
        quantity: 1,
        name: "Product 1",
        unitPriceInCents: 1000,
      });

      order.addItem({
        productId: "p2",
        quantity: 2,
        name: "Product 2",
        unitPriceInCents: 1500,
      });

      expect(order.totalPriceInCents).toBe(1000 + 2 * 1500);
    });
  });
});
