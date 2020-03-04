import React from "react";

type Props = {
  fill?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export const DateAdded = ({
  width = '20px',
  height = '20px',
  className = '',
}: Props) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className={`svg-icon ${className || ''}`}>
    <path d="M15 2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h2V0h2v2h6V0h2v2zM3 6v12h14V6H3zm6 5V9h2v2h2v2h-2v2H9v-2H7v-2h2z"/>
  </svg>
);

export default DateAdded;
