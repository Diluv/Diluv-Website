import React from "react";

interface Props {
    name: string;
    children: React.ReactNode;
    className?: string;
}

export default function GridArea({ name, children, className = "" }: Props): JSX.Element {
    return (
        <div className={className} style={{ gridArea: name }}>
            {children}
        </div>
    );
}
