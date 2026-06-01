import React from "react";

export default function Spinner({ className = "", ...props }) {
  return (
    <div
      className={`spinner ${className}`}
      {...props}
    />
  );
}
