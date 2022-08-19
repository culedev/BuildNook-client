import service from "./config.services";

const getAllProducts = () => {
  return service.get(`/products`);
};

const addProducts = (inputs) => {
  return service.post("/products", inputs);
};

const editProducts = (productId, inputs) => {
  return service.patch(`/products/${productId}`, inputs);
};

const deleteProduct = (productId) => {
  return service.delete(`/products/${productId}`);
};

const addToWishList = (productId) => {
    return service.patch(`/wishlist/${productId}`)
}

const filteredCategorie = (categorie) => {
    return service.get(`/products/${categorie}`)
}

export {
  getAllProducts,
  addProducts,
  editProducts,
  deleteProduct,
  addToWishList,
  filteredCategorie,
};
