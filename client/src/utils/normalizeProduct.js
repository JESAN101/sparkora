export const normalizeProduct = (product) => ({
  ...product,
  id: product._id,          // ProductCard/links use product.id
  image: product.images?.[0] || "", // single-image fallback for ProductCard
  images: product.images || [],     // ProductGallery already expects this
});