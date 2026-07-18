import API from "../api/axios";

export const getProductReviews = async (productId) => {
  const res = await API.get(`/products/${productId}/reviews`);
  return res.data;
};

export const getReviewEligibility = async (productId) => {
  const res = await API.get(`/products/${productId}/reviews/eligibility`);
  return res.data;
};

export const createReview = async (productId, payload) => {
  const res = await API.post(`/products/${productId}/reviews`, payload);
  return res.data;
};

export const updateReview = async (productId, reviewId, payload) => {
  const res = await API.put(`/products/${productId}/reviews/${reviewId}`, payload);
  return res.data;
};

export const deleteReview = async (productId, reviewId) => {
  const res = await API.delete(`/products/${productId}/reviews/${reviewId}`);
  return res.data;
};