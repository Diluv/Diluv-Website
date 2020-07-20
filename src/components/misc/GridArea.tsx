import React, { ReactChildren, ReactNode } from "react";


interface Props {
    name: string
    children:  React.ReactNode
    className?: string
}

export default function GridArea({ name, children, className = "" }: Props) {
    return <div className={className} style={{gridArea: name}}>
        {children}
    </div>;
}