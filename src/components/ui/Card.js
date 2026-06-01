import React from "react";

export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-[var(--color-surface)] p-[var(--spacing-lg)] rounded-[var(--radius-md)] shadow-[0_8px_24px_rgba(0,0,0,0.05)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ContentCard({ className = "", children, ...props }) {
  return (
    <div
      className={`bg-[var(--color-white)] rounded-[16px] p-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] mb-[24px] border border-[var(--color-border)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ className = "", children, ...props }) {
  return (
    <h2
      className={`text-[var(--color-text)] text-[var(--text-large)] font-bold m-0 flex items-center gap-[12px] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function HeaderContainer({ className = "", children, ...props }) {
  return (
    <div
      className={`flex justify-between items-center mb-[32px] flex-wrap gap-[16px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeaderLeft({ className = "", children, ...props }) {
  return (
    <div
      className={`flex items-center gap-[24px] flex-wrap ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function HeaderRight({ className = "", children, ...props }) {
  return (
    <div
      className={`flex items-center gap-[16px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
