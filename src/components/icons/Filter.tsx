import React from "react";

type Props = {
    fill?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
};

export const Filter = ({ width = "20px", height = "20px", className = "" }: Props): JSX.Element => (
    <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`svg-icon ${className || ""}`}>
        <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
    </svg>
);
export default Filter;
