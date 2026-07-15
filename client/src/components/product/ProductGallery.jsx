import { useState } from "react";
import ImageModal from "./ImageModal";

const ProductGallery = ({ product }) => {
  const images = product.images || [product.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectedImage = images[currentIndex];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">

        {/* Thumbnail Images */}
        <div className="flex md:flex-col gap-4 order-2 md:order-1">

          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                currentIndex === index
                  ? "border-pink-500"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover"
              />
            </button>
          ))}

        </div>

        {/* Main Image */}
        <div className="flex-1 bg-white rounded-3xl shadow-lg overflow-hidden">

          <img
            src={selectedImage}
            alt={product.name}
            onClick={() => setIsOpen(true)}
            className="w-full h-[600px] object-cover transition duration-500 hover:scale-105 cursor-zoom-in"
          />

        </div>

      </div>

      {/* Image Modal */}
      {isOpen && (
        <ImageModal
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProductGallery;