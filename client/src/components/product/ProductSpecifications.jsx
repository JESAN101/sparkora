const ProductSpecifications = ({ product }) => {
  return (
    <div className="mt-10 border-t border-line pt-8">

      <h2 className="font-display text-2xl font-semibold text-charcoal mb-6">
        Specifications
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between items-center pb-3 border-b border-line">
          <span className="text-taupe">
            Material
          </span>

          <span className="font-medium text-charcoal">
            {product.material}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-line">
          <span className="text-taupe">
            Gemstone
          </span>

          <span className="font-medium text-charcoal">
            {product.gemstone}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-line">
          <span className="text-taupe">
            Purity
          </span>

          <span className="font-medium text-charcoal">
            {product.purity}
          </span>
        </div>

        <div className="flex justify-between items-center pb-3 border-b border-line">
          <span className="text-taupe">
            Weight
          </span>

          <span className="font-medium text-charcoal">
            {product.weight}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-taupe">
            Warranty
          </span>

          <span className="font-medium text-charcoal">
            {product.warranty}
          </span>
        </div>

      </div>

    </div>
  );
};

export default ProductSpecifications;