import { toast } from "react-toastify";

class NotificationsService {
  private static instance: NotificationsService | null = null;

  static getInstance(): NotificationsService {
    if (!this.instance) {
      this.instance = new NotificationsService();
    }

    return this.instance;
  }

  showInfo(message: string) {
    toast.info?.(message);
  }

  showSuccess(message: string) {
    toast.success?.(message);
  }

  showWarning(message: string) {
    toast.warn?.(message);
  }

  showError(message: string) {
    toast.error?.(message);
  }
}

export { NotificationsService };
