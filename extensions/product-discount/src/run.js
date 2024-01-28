// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export function run(input) {
  const targets = input.cart.lines
  .filter((line) => line.quantity >= 2 &&
    line.merchandise.__typename == "ProductVariant")
  .map((line) => {
    const variant = (line.merchandise);
    return ({

      productVariant: {
        id: variant.id
      }
    });
  });

  if (!targets.length) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        targets,
        value: {
          percentage: {
            value: "10.0"
          }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.First
  };
};
