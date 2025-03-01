export const cartItemsFormatter = (initialCartItems) => {
  console.log(initialCartItems);
  // if (initialCartItems.items == []) return [];
  return initialCartItems.map((item) => ({
    _id: item.product._id,
    user: item.product.user,
    name: item.product.name,
    profileImage: item.product.profileImage,
    image: item.product.image,
    brand: item.product.brand,
    gender: item.product.gender,
    isWearable: item.product.isWearable,
    watchType: item.product.watchType,
    description: item.product.description,
    rating: item.product.rating,
    numReviews: item.product.numReviews,
    price: item.product.price,
    countInStock: item.product.countInStock,
    reviews: item.product.reviews,
    createdAt: item.product.createdAt,
    updatedAt: item.product.updatedAt,
    __v: item.product.__v,
    qty: item.quantity,
  }));
};

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the cart to localStorage
  // localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
