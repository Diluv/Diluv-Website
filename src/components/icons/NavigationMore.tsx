import React from "react";

type Props = {
  fill?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export const NavigationMore = ({
  width = '20px',
  height = '20px',
  className = '',
}: Props) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`svg-icon ${className || ''}`}>
    <path d="M4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
  </svg>
);
export default NavigationMore;
