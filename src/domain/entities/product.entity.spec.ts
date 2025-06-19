// product.spec.ts
import { describe, expect, it } from "vitest";
import { Product } from "./product.entity";

describe("Product Entity", () => {
  describe("Create, restore", () => {
    it("should create a product with valid props", () => {
      const product = Product.create({
        name: "Test Product",
        priceInCents: 1000,
        description: "A valid product description.",
        stockQuantity: 10,
        thumbnailUrl: "https://example.com/image.jpg",
      });

      expect(product.id).toBeDefined();
    });

    it("should not create product with invalid props", () => {
      expect(() => Product.create({} as any)).toThrow();
      expect(() =>
        Product.create({
          name: "ab",
          priceInCents: 10,
          description: "short",
          stockQuantity: -1,
          thumbnailUrl: "invalid-url",
        } as any)
      ).toThrow();
    });

    it("should restore a product with all props", () => {
      const product = Product.restore({
        id: "prod-id",
        name: "Restored Product",
        priceInCents: 1500,
        description: "Restored product description.",
        stockQuantity: 5,
        thumbnailUrl: "https://example.com/image.png",
      });

      expect(product.id).toBe("prod-id");
    });

    it("should not restore product with invalid props", () => {
      expect(() => Product.restore({} as any)).toThrow();
      expect(() =>
        Product.restore({
          id: "123",
          name: "a",
          priceInCents: 50,
          description: "tiny",
          stockQuantity: -10,
          thumbnailUrl: "invalid",
        } as any)
      ).toThrow();
    });
  });

  describe("toJSON", () => {
    it("should return a valid product JSON", () => {
      const product = Product.create({
        name: "JSON Product",
        priceInCents: 999,
        description: "Product for JSON test.",
        stockQuantity: 1,
        thumbnailUrl: "https://example.com/thumb.png",
      });

      expect(product.toJSON()).toEqual({
        id: product.id,
        name: product.name,
        priceInCents: product.priceInCents,
        description: product.description,
        stockQuantity: product.stockQuantity,
      });
    });
  });

  describe("getters", () => {
    it("should expose all getters correctly", () => {
      const product = Product.create({
        name: "Getter Product",
        priceInCents: 500,
        description: "Testing getters.",
        stockQuantity: 0,
        thumbnailUrl: "https://example.com/thumb.jpg",
      });

      expect(product.id).toBeDefined();
      expect(product.name).toBe("Getter Product");
      expect(product.priceInCents).toBe(500);
      expect(product.description).toBe("Testing getters.");
      expect(product.stockQuantity).toBe(0);
      expect(product.thumbnailUrl).toBe("https://example.com/thumb.jpg");
    });
  });

  describe("derived getters", () => {
    it("should return true for hasStock when stock > 0", () => {
      const product = Product.create({
        name: "In-stock Product",
        priceInCents: 1500,
        description: "Has stock.",
        stockQuantity: 3,
        thumbnailUrl: "https://example.com/stock.jpg",
      });

      expect(product.hasStock).toBe(true);
    });

    it("should return false for hasStock when stock is 0", () => {
      const product = Product.create({
        name: "Out-of-stock Product",
        priceInCents: 1500,
        description: "No stock.",
        stockQuantity: 0,
        thumbnailUrl: "https://example.com/out.jpg",
      });

      expect(product.hasStock).toBe(false);
    });
  });
});
