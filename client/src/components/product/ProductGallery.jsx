import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageModal from "./ImageModal";

const ProductGallery = ({ product }) => {
  const images = product.images?.length
    ? product.images
    : [product.image];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const selectedImage = images[currentIndex];

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">

        {/* Thumbnails */}

        <div className="flex md:flex-col gap-4 order-2 md:order-1">

          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                overflow-hidden
                rounded-2xl
                border-2
                transition-all
                duration-300
                bg-cream

                ${
                  currentIndex === index
                    ? "border-gold shadow-lg scale-105"
                    : "border-line hover:border-rose"
                }
              `}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="
                  w-20
                  h-20
                  object-cover
                  hover:scale-110
                  transition-transform
                  duration-300
                "
              />
            </button>
          ))}

        </div>

        {/* Main Image */}

        <div
          className="
            flex-1
            card-luxury
            overflow-hidden
            rounded-3xl
            cursor-zoom-in
          "
        >
          <AnimatePresence mode="wait">

            <motion.img
              key={selectedImage}
              src={selectedImage}
              alt={product.name}
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="
                w-full
                h-[650px]
                object-cover
                hover:scale-105
                transition-transform
                duration-700
              "
            />

          </AnimatePresence>
        </div>

      </div>

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