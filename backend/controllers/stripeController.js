import asyncHandler from "../middleware/asyncHandler.js";
import Stripe from "stripe";
import Product from "../models/productModel.js";

const stripe = new Stripe("sk_test_tR3PYbcVNZZ796tH88S4VQ2u");
const YOUR_DOMAIN = "http://localhost:3000";

export const checkoutSession = asyncHandler(async (req, res) => {
  console.log("hello");
  console.log(req.body);
  const { productId } = req.body;
  console.log(productId);

  // Retrieve the product from your database using the productId
  const product = await Product.findById(productId);
  console.log(product);

  const priceData = {
    currency: "inr",
    unit_amount: product.price * 100, // Multiply by 100 to convert to the smallest currency unit
    product_data: {
      name: product.name,
      description: product.description,
    },
  };

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: priceData,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  console.log(session.url);
  res.redirect(303, session.url);
});
