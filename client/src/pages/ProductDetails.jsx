import { useParams } from "react-router-dom";
import products from "../data/products";

import Breadcrumb from "../components/product/Breadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductReviews from "../components/product/ProductReviews";

const ProductDetails = () => {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h2 className="text-4xl font-bold text-gray-700">
          Product Not Found
        </h2>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Breadcrumb product={product} />

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left Side */}
          <ProductGallery product={product} />

          {/* Right Side */}
          <ProductInfo product={product} />

        </div>

        <ProductReviews product={product} />

<div className="mt-24">
  <RelatedProducts currentProduct={product} />
</div>

        {/* Related Products */}
        <div className="mt-24">
          <RelatedProducts currentProduct={product} />
        </div>

      </div>

    </section>
  );
};

export default ProductDetails;