import service from "./config.services";

const getTransactions = () => {
  return service.get("/transaction");
};

const addProductToCart = (productId) => {
  return service.patch(`/transaction/${productId}`);
};

export {getTransactions, addProductToCart};
