import React from "react";

export function Modal({ className = "", children, ...props }) {
  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-[4px] flex items-center justify-center z-[1000] animate-fade-in ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalContent({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-[var(--color-white)] p-[var(--spacing-lg)] rounded-[var(--radius-md)] max-w-[520px] w-[90%] max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-slide-up ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalHeader({ className = "", children, ...props }) {
  return (
    <div
      className={`flex justify-between items-center mb-[24px] pb-[16px] border-b-2 border-[var(--color-border)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ModalTitle({ className = "", children, ...props }) {
  return (
    <h3
      className={`text-[var(--text-large)] font-bold text-[var(--color-text)] m-0 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function ModalOverlay({ className = "", children, ...props }) {
  return (
    <div
      className={`fixed inset-0 bg-black/40 flex justify-center items-center z-[1000] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
