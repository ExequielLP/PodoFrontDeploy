import { toast } from "sonner";

const showToast = (message, type = "info", options = {}) => {
  const toastOptions = {
    className: `toast-${type}`,
    style: { width: "fit-content", height: "fit-content", padding: "8px", border: "1px solid #FF9ABF"
    },
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};

export default showToast;