import React from "react";

export default function Button({ href = "#", variant = "primary", children, className = "", ...props }) {
  const base = "px-6 py-3 rounded-full font-semibold transform transition-all duration-300 inline-flex items-center justify-center";

  const variants = {
    primary: "bg-primary-500 text-white hover:bg-white hover:text-primary-600 shadow-md hover:scale-110 hover:text-blue-600",
    outline: "bg-transparent text-white border border-white hover:bg-white hover:text-primary-600 shadow-md hover:scale-110",
  };

  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
