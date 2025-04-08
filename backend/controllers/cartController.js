import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js"; // Ensure you have a Cart model
import Product from "../models/productModel.js";

// @desc    Get all cart items for a user
// @route   GET /api/cart
// @access  Private
const getCartItems = asyncHandler(async (req, res) => {
  console.log("getCartItems");
  const cart = await Cart.findOne({ user: req.params.userId }).populate(
    "items.product"
  );

  if (!cart) {
    return res.json([]);
  }

  res.json(cart.items);
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({ user: req.user._id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(201).json(cart.items);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.json(cart.items);
});

// @desc    Clear entire cart
// @route   DELETE /api/cart/clear
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = [];
  await cart.save();

  res.json({ message: "Cart cleared" });
});

export { getCartItems, addToCart, removeFromCart, clearCart };
