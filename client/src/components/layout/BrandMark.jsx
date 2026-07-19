// A small faceted-gem mark used beside the "Sparkora" wordmark. Kept as
// inline SVG (not a raster asset) so it scales crisply and can inherit
// the gold accent color at any size.
const BrandMark = ({ size = 22, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M6.5 3.5H17.5L21.5 9L12 21L2.5 9L6.5 3.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 9H21.5M8.5 3.5L12 9L15.5 3.5M12 9L8 21M12 9L16 21"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      opacity="0.75"
    />
  </svg>
);

export default BrandMark;