import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProduct,
  incrementProductViews,
} from "../services/productService";
import { normalizeProduct } from "../utils/normalizeProduct";

import Breadcrumb from "../components/product/Breadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductReviews from "../components/product/ProductReviews";
import RelatedProducts from "../components/product/RelatedProducts";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setNotFound(false);

        const data = await getProduct(id);

setProduct(normalizeProduct(data.product));

const viewKey = `product-view-${id}`;

const lastViewed = localStorage.getItem(viewKey);

const THIRTY_MINUTES = 30 * 60 * 1000;

if (
  !lastViewed ||
  Date.now() - Number(lastViewed) > THIRTY_MINUTES
) {
  await incrementProductViews(id);

  localStorage.setItem(
    viewKey,
    Date.now().toString()
  );
}

      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-6 text-taupe tracking-wide">
            Loading exquisite jewellery...
          </p>

        </div>
      </section>
    );
  }

  if (notFound || !product) {
    return (
      <section className="min-h-screen bg-ivory flex items-center justify-center">

        <div className="card-luxury p-14 text-center max-w-lg">

          <h2 className="font-display text-5xl text-charcoal">
            Product Not Found
          </h2>

          <p className="mt-4 text-taupe">
            The jewellery you're looking for is unavailable or has been removed.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="bg-ivory min-h-screen py-14 transition-colors duration-300">

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <Breadcrumb product={product} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          <ProductGallery product={product} />

          <ProductInfo product={product} />

        </div>

        <div className="mt-24">

          <ProductReviews product={product} />

        </div>

        <div className="mt-28">

          <RelatedProducts currentProduct={product} />

        </div>

      </div>

    </section>
  );
};

export default ProductDetails;