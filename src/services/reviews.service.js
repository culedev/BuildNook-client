import service from "./config.services";

// Gives all reviews
const getAllReviews = (productId) => {
  return service.get(`/reviews/${productId}`);
};
// Create a new review
const postReview = (productId, inputs) => {
  return service.post(`/reviews/${productId}`, inputs);
};

// Delete a review
const deleteReview = (reviewId) => {
  return service.delete(`/reviews/${reviewId}`);
};

// Get avg Rating
const avgRating = (productId) => {
  return service.get(`/reviews/${productId}/rating`);
};
export { getAllReviews, postReview, deleteReview, avgRating };
