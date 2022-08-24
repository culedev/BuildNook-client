import service from "./config.services";
// Get user transcations
const getTransactions = () => {
  return service.get("/transaction");
};
// Add product to Shopping Cart
const addProductToCart = (productId) => {
  return service.patch(`/transaction/${productId}`);
};

// Delete product from shopping cart
const deleteProductFromCart = (productId) => {
  return service.patch(`/transaction/${productId}/delete`);
};

// POST user intent payment
const postIntentPayment = (items) => {
  return service.post("/transaction/create-payment-intent", items);
};

// PATCH payment transaction
const patchPayment = (clientSecret) => {
  return service.patch("/transaction", clientSecret)
}

export {
  getTransactions,
  addProductToCart,
  deleteProductFromCart,
  postIntentPayment,
  patchPayment,
};
