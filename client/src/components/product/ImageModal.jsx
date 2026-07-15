import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageModal = ({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (currentIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

      {/* Close */}

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl"
      >
        <FaTimes />
      </button>

      {/* Previous */}

      <button
        onClick={prevImage}
        className="absolute left-8 text-white text-4xl"
      >
        <FaChevronLeft />
      </button>

      {/* Image */}

      <img
        src={images[currentIndex]}
        alt=""
        className="max-h-[85vh] max-w-[85vw] rounded-2xl"
      />

      {/* Next */}

      <button
        onClick={nextImage}
        className="absolute right-8 text-white text-4xl"
      >
        <FaChevronRight />
      </button>

    </div>
  );
};

export default ImageModal;