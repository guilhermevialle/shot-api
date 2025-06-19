import { idService } from "../config/id-service";
import {
  CreateProductProps,
  ProductProps,
  RestoreProductProps,
} from "../interfaces/entities/product.interface";

export class Product {
  private props: RestoreProductProps;

  private constructor(props: ProductProps) {
    this.props = {
      ...props,
      id: props.id ?? idService.generate(),
    };
  }

  static create(props: CreateProductProps) {
    const product = new Product({ ...props });

    return product;
  }

  static restore(props: RestoreProductProps) {
    return new Product({ ...props });
  }

  public toJSON() {
    return {
      id: this.props.id,
      name: this.props.name,
      priceInCents: this.props.priceInCents,
      description: this.props.description,
      stockQuantity: this.props.stockQuantity,
    };
  }

  // getters
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get priceInCents() {
    return this.props.priceInCents;
  }
  get description() {
    return this.props.description;
  }
  get stockQuantity() {
    return this.props.stockQuantity;
  }
  get thumbnailUrl() {
    return this.props.thumbnailUrl;
  }

  // derived getters
  get hasStock(): boolean {
    return this.props.stockQuantity > 0;
  }
}
