// order-item.spec.ts
import { describe, expect, it } from "vitest";
import { OrderItem } from "./order-item.entity";

describe("OrderItem Entity", () => {
  describe("Create, restore", () => {
    it("should create an order item with valid props", () => {
      const orderItem = OrderItem.create({
        orderId: "order-123",
        productId: "product-456",
        name: "Test Product",
        quantity: 2,
        unitPriceInCents: 1500,
      });

      expect(orderItem.id).toBeDefined();
    });

    it("should not create order item with invalid props", () => {
      expect(() => OrderItem.create({} as any)).toThrow();
      expect(() =>
        OrderItem.create({
          orderId: "",
          productId: "",
          name: "",
          quantity: -1,
          unitPriceInCents: -100,
        } as any)
      ).toThrow();
    });

    it("should restore an order item with all props", () => {
      const orderItem = OrderItem.restore({
        id: "item-789",
        orderId: "order-123",
        productId: "product-456",
        name: "Restored Product",
        quantity: 3,
        unitPriceInCents: 2000,
      });

      expect(orderItem.id).toBe("item-789");
    });

    it("should not restore order item with invalid props", () => {
      expect(() => OrderItem.restore({} as any)).toThrow();
      expect(() =>
        OrderItem.restore({
          id: "id-1",
          orderId: "",
          productId: "",
          name: "",
          quantity: -5,
          unitPriceInCents: 0,
        } as any)
      ).toThrow();
    });
  });

  describe("incrementQuantity", () => {
    it("should increment quantity correctly", () => {
      const orderItem = OrderItem.create({
        orderId: "order-123",
        productId: "product-456",
        name: "Test Product",
        quantity: 2,
        unitPriceInCents: 1500,
      });

      orderItem.incrementQuantity(3);
      expect(orderItem.quantity).toBe(5);
    });
  });

  describe("toJSON", () => {
    it("should return a valid order item JSON", () => {
      const orderItem = OrderItem.create({
        orderId: "order-123",
        productId: "product-456",
        name: "Test Product",
        quantity: 4,
        unitPriceInCents: 1000,
      });

      expect(orderItem.toJSON()).toEqual({
        id: orderItem.id,
        orderId: orderItem.orderId,
        productId: orderItem.productId,
        name: orderItem.name,
        quantity: orderItem.quantity,
        unitPriceInCents: orderItem.unitPriceInCents,
        totalPriceInCents: orderItem.totalPriceInCents,
      });
    });
  });

  describe("getters", () => {
    it("should expose all getters correctly", () => {
      const orderItem = OrderItem.create({
        orderId: "order-123",
        productId: "product-456",
        name: "Test Product",
        quantity: 1,
        unitPriceInCents: 1200,
      });

      expect(orderItem.id).toBeDefined();
      expect(orderItem.orderId).toBe("order-123");
      expect(orderItem.productId).toBe("product-456");
      expect(orderItem.name).toBe("Test Product");
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.unitPriceInCents).toBe(1200);
    });
  });

  describe("derived getters", () => {
    it("should calculate totalPriceInCents correctly", () => {
      const orderItem = OrderItem.create({
        orderId: "order-123",
        productId: "product-456",
        name: "Test Product",
        quantity: 3,
        unitPriceInCents: 1000,
      });

      expect(orderItem.totalPriceInCents).toBe(3000);
    });
  });
});
