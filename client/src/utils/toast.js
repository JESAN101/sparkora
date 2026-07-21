import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "14px",
  padding: "14px 18px",
  fontSize: "14px",
  fontWeight: 500,
  boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  border: "1px solid rgba(0,0,0,0.06)",
  maxWidth: "420px",
};

export const showSuccess = (message) =>
  toast.success(message, {
    style: {
      ...baseStyle,
      background: "#ffffff",
      color: "#2c2c2c",
      borderLeft: "4px solid #b76e79",
    },
    iconTheme: {
      primary: "#b76e79",
      secondary: "#ffffff",
    },
    duration: 3500,
  });

export const showError = (message) =>
  toast.error(message, {
    style: {
      ...baseStyle,
      background: "#ffffff",
      color: "#2c2c2c",
      borderLeft: "4px solid #7d2333",
    },
    iconTheme: {
      primary: "#7d2333",
      secondary: "#ffffff",
    },
    duration: 4000,
  });