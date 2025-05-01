"use client";

import { useRef, useEffect } from "react";

interface AlertDialogProps {
  message: string | null;
  onClose: () => void;
  onConfirm?: () => void;
}

export function AlertDialog({
  message,
  onClose,
  onConfirm,
}: Readonly<AlertDialogProps>) {
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

  function handleOK() {
    ref.current?.close();
    onConfirm?.();
  }

  return (
    <dialog ref={ref} className="alert-dialog" onClose={onClose}>
      <span>{message}</span>
      <div className="dialog-buttons">
        {onConfirm ? (
          <>
            <button onClick={() => ref.current?.close()}>Cancel</button>
            <button onClick={handleOK}>OK</button>
          </>
        ) : (
          <button onClick={() => ref.current?.close()}>OK</button>
        )}
      </div>
    </dialog>
  );
}
