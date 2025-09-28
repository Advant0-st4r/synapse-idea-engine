import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  // optional: allow passing a custom container class
  className?: string;
};

/**
 * Small accessible modal / portal component.
 * - API: <Modal open={open} onOpenChange={setOpen}>...content...</Modal>
 * - Closes on overlay click & Escape key.
 * - Locks body scroll while open.
 * - Minimal styling using your Tailwind/shadcn tokens (bg-card, rounded, shadow).
 */
export function Modal({ open, onOpenChange, children, className = "" }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    // lock body scroll when modal is open
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <>
      {open ? (
        <div
          aria-hidden={!open}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* overlay */}
          <div
            onClick={() => onOpenChange(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          />

          {/* content container */}
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full max-w-3xl p-0 ${className}`}
          >
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.body
  );
}

export default Modal;
