import React from "react";

type Props = {
  fill?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export const Search = ({
  width = '20px',
  height = '20px',
  className = '',
}: Props) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`svg-icon ${className || ''}`}>
    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
  </svg>
);
export default Search;
