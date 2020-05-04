import React from "react";

type Props = {
  fill?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export const Filter = ({
  width = '20px',
  height = '20px',
  className = '',
}: Props) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`svg-icon ${className || ''}`}>
    <path d="M12 12l8-8V0H0v4l8 8v8l4-4v-4z"/>
  </svg>
);
export default Filter;
