"use client";

import { useRef, useEffect } from "react";

interface AlertDialogProps {
  message: string | null;
  onClose: () => void;
}

export function AlertDialog({ message, onClose }: Readonly<AlertDialogProps>) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (message && !dialog.open) {
      dialog.showModal();
    }

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [message, onClose]);

  return (
    <dialog ref={ref} className="alert-dialog" onClose={onClose}>
      <span>{message}</span>
      <button onClick={() => ref.current?.close()}>OK</button>
    </dialog>
  );
}
