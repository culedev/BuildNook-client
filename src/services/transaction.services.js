import service from "./config.services";
// Get user transcations
const getTransactions = () => {
  return service.get("/transaction");
};
// Add product to Shopping Cart
const addProductToCart = (productId) => {
  return service.patch(`/transaction/${productId}`);
};

export {getTransactions, addProductToCart};
