const StatCard = ({ label, value, icon: Icon, accent = "rose" }) => {
  const accentStyles = {
    rose: "bg-blush text-rose-dark",
    gold: "bg-[#eee7d5] text-gold",
    green: "bg-[#e4ede4] text-[#3f6b4d]",
    burgundy: "bg-[#f3e0e5] text-burgundy",
  };

  return (
    <div className="card-luxury p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accentStyles[accent]}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-taupe mb-1 truncate">{label}</p>
        <p className="font-display text-2xl font-semibold text-charcoal truncate">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
