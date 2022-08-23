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
  return service.patch(`/transaction/${productId}/delete`)
}

export {getTransactions, addProductToCart, deleteProductFromCart};
