import React, { ReactNode } from "react";

type Props = {
  disabled: boolean
  children: ReactNode
  className?: string
};

export default function ({
  disabled, children,
  className = "font-bold block bg-diluv-500 disabled:bg-diluv-500 hover:bg-diluv-700 text-white p-2 w-full transition-colors duration-200 ease-in disabled:opacity-50 disabled:cursor-not-allowed"
}: Props) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={className}
    >
      {children}
    </button>
  )
}