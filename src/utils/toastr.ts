import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export default function toast(
  message: string,
  type: ToastType,
  title?: string,
  options?: unknown
): void {
  toastr.options = {
    closeButton: true,
    progressBar: true,
    newestOnTop: true,
    positionClass: 'toast-top-center',
  };

  if (!message) message = 'Une erreur est survenue';

  switch (type) {
    case 'success':
      toastr.success(message, title, options);
      break;

    case 'error':
      toastr.error(message, title, options);
      break;

    case 'warning':
      toastr.warning(message, title, options);
      break;

    case 'info':
      toastr.info(message, title, options);
      break;

    default:
      toastr.success(message, title, options);
      break;
  }
}
