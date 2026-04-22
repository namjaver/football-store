"use client";

const variants = {
  primary: "bg-[#00e676] text-black hover:bg-[#00c853] font-semibold",
  secondary: "bg-[#1e1e26] text-[#eaeaf0] hover:bg-[#2e2e3a] border border-[#2e2e3a]",
  ghost: "bg-transparent text-[#eaeaf0] hover:bg-[#1e1e26]",
  danger: "bg-[#ff1744] text-white hover:bg-red-700 font-semibold",
  outline: "bg-transparent border border-[#00e676] text-[#00e676] hover:bg-[#00e67615]",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-base rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 cursor-pointer
        transition-all duration-150 select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
