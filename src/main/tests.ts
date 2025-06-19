import { Order } from "@/domain/aggregates/order.aggregate";
import { Customer } from "@/domain/entities/customer.entity";
import { Product } from "@/domain/entities/product.entity";
import { fromCents, toCents } from "@/utils/cents";

const gui = Customer.create({
  username: "guivialle",
});

const AppleMacbook = Product.create({
  name: "Apple Macbook Pro",
  priceInCents: toCents(999.9),
  description:
    "Apple Macbook Pro: M1 Pro, 16GB RAM, 1TB SSD, 4K Retina Display - Space Gray (2021) ",
  stockQuantity: 7,
  thumbnailUrl: "https://example.com/thumbnail.jpg",
});

const GamerPc = Product.create({
  name: "Gamer PC",
  priceInCents: toCents(2789.37),
  description:
    "Gamer PC: i7, 16GB RAM, 1TB SSD, 4K Retina Display - Space Gray (2021) ",
  stockQuantity: 3,
  thumbnailUrl: "https://example.com/thumbnail.jpg",
});

const order = Order.create({
  customerId: gui.id,
});

order.addItem({
  productId: AppleMacbook.id,
  name: AppleMacbook.name,
  quantity: 1,
  unitPriceInCents: AppleMacbook.priceInCents,
});

order.addItem({
  productId: GamerPc.id,
  name: GamerPc.name,
  quantity: 1,
  unitPriceInCents: GamerPc.priceInCents,
});

console.log(fromCents(order.totalPriceInCents));
