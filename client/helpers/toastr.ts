import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const TOAST_SUCCESS = "success";
export const TOAST_ERROR = "error";
export const TOAST_WARNING = "warning";
export const TOAST_INFO = "info";

const addToast = (
  message: string,
  type: "success" | "error" | "warning" | "info",
  title?: string,
  options?: any
): void => {
  toastr.options = {
    closeButton: true,
    progressBar: true,
    newestOnTop: true,
    positionClass: "toast-top-center",
  };

  switch (type) {
    case TOAST_SUCCESS:
      toastr.success(message, title, options);
      break;

    case TOAST_ERROR:
      toastr.error(message, title, options);
      break;

    case TOAST_WARNING:
      toastr.warning(message, title, options);
      break;

    case TOAST_INFO:
      toastr.info(message, title, options);
      break;

    default:
      toastr.success(message, title, options);
      break;
  }
};

export default addToast;
