import service from "./config.services";

// Gives all reviews
const getAllReviews = (productId) => {
    return service.get(`/reviews/${productId}`)
}
// Create a new review
const postReview = (productId, inputs) => {
    return service.post(`/reviews/${productId}`, inputs)
}


export { getAllReviews, postReview };