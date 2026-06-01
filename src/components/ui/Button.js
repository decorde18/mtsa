import React from "react";

export default function Button({ className = "", children, ...props }) {
  return (
    <button
      className={`py-[var(--padding-md)] px-[var(--padding-lg)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-[var(--radius-md)] font-semibold text-[var(--text-button)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_16px_var(--shadow-primary)] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
