import React from "react";

export default function PromotedHeader({ children, className }: React.PropsWithChildren<{ className?: string }>) {
    return <div className={`border-b-2 dark:border-dark-700 pb-1 font-medium text-xl ${className}`}>{children}</div>;
}
