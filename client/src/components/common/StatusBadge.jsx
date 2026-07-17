const STATUS_STYLES = {
  pending: "bg-blush text-rose-dark",
  processing: "bg-blush text-rose-dark",
  shipped: "bg-[#eee7d5] text-gold",
  delivered: "bg-[#e4ede4] text-[#3f6b4d]",
  cancelled: "bg-[#f3e0e5] text-burgundy",
};

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
      STATUS_STYLES[status] || "bg-blush text-rose-dark"
    }`}
  >
    {status}
  </span>
);

export default StatusBadge;
