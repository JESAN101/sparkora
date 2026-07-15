const ProductSpecifications = ({ product }) => {
  return (
    <div className="mt-10 border-t pt-8">

      <h2 className="text-2xl font-bold mb-6">
        Specifications
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Material
          </span>

          <span>{product.material}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Gemstone
          </span>

          <span>{product.gemstone}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Purity
          </span>

          <span>{product.purity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Weight
          </span>

          <span>{product.weight}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Warranty
          </span>

          <span>{product.warranty}</span>
        </div>

      </div>

    </div>
  );
};

export default ProductSpecifications;