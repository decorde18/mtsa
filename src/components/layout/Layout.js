import React from "react";


export default function Layout({ className = "", children, ...props }) {
  return (<>

    <body
      className={`max-w-[1200px] mx-auto p-[var(--spacing-lg)] ${className}`}
      {...props}
      >
      {children}
    </body>
      </>
  );
}
