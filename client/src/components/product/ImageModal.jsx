import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center">

      {/* Close Button */}

      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition"
      >
        <FaTimes size={20} />
      </button>

      {/* Previous */}

      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="absolute left-6 md:left-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition"
        >
          <FaChevronLeft size={22} />
        </button>
      )}

      {/* Main Content */}

      <div className="flex flex-col items-center">

        <img
          src={images[currentIndex]}
          alt=""
          className="max-h-[78vh] max-w-[90vw] rounded-3xl shadow-2xl object-contain transition-all duration-300"
        />

        {/* Counter */}

        <p className="mt-5 text-white/80 tracking-wider text-sm">
          {currentIndex + 1} / {images.length}
        </p>

        {/* Thumbnail Gallery */}

        {images.length > 1 && (
          <div className="flex gap-3 mt-6 overflow-x-auto px-4">

            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-xl overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? "border-gold scale-105"
                    : "border-white/20 hover:border-white/50"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}

          </div>
        )}

      </div>

      {/* Next */}

      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-6 md:right-10 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center text-white transition"
        >
          <FaChevronRight size={22} />
        </button>
      )}

    </div>
  );
};

export default ImageModal;