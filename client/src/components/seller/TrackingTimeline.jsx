import { FaCheck, FaTimes } from "react-icons/fa";

const STEPS = ["pending", "processing", "shipped", "delivered"];

const TrackingTimeline = ({ status }) => {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-xs text-burgundy font-medium">
        <FaTimes size={12} /> Cancelled
      </div>
    );
  }

  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="flex items-center w-full max-w-xs">
      {STEPS.map((step, i) => {
        const isDone = i <= currentIndex;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                  isDone ? "bg-rose text-ivory" : "bg-line text-taupe"
                }`}
              >
                {isDone ? <FaCheck size={9} /> : i + 1}
              </div>
              <span
                className={`text-[10px] capitalize whitespace-nowrap ${
                  isDone ? "text-charcoal font-medium" : "text-taupe"
                }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-[2px] flex-1 mx-1 mb-4 ${i < currentIndex ? "bg-rose" : "bg-line"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TrackingTimeline;
