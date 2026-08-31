"use client";

import { toast } from "sonner";

const baseErrorStyle = {
  backgroundColor: "#fff0f0",
  border: "1px solid rgb(181, 0, 0)",
  color: "rgb(108, 4, 4)",
};

const baseSuccessStyle = {
  backgroundColor: "#f0fff0",
  border: "1px solid rgb(0, 181, 0)",
  color: "rgb(4, 108, 4)",
};

export function showError(message: string) {
  toast.error(message, {
    position: "top-right",
    duration: 4000,
    style: baseErrorStyle,
  });
}

export function showSuccess(message: string) {
  toast.success(message, {
    position: "top-right",
    duration: 4000,
    style: baseSuccessStyle,
  });
}