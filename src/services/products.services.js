import service from "./config.services";

// Give All products
const getAllProducts = () => {
  return service.get(`/products`);
};
// Post new product
const addProducts = (inputs) => {
  return service.post("/products", inputs);
};
// Edit product by ID
const editProducts = (productId, inputs) => {
  return service.patch(`/products/${productId}`, inputs);
};
// Delete product by ID
const deleteProduct = (productId) => {
  return service.delete(`/products/${productId}`);
};
// Add product to user wish list 
const addToWishList = (productId) => {
  return service.patch(`/wishlist/${productId}`);
};
// Remove product from user wish list
const removeFromWishList = (productId) => {
  return service.patch(`/wishlist/${productId}/delete`)
}
// Filter products by Categories
const filteredCategorie = (categorie) => {
  return service.get(`/products/${categorie}`);
};
// Give product details
const getProductDetails = (productId) => {
  return service.get(`/products/${productId}/details`);
};

export {
  getAllProducts,
  addProducts,
  editProducts,
  deleteProduct,
  addToWishList,
  filteredCategorie,
  getProductDetails,
  removeFromWishList,
};
