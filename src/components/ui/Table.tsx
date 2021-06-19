import React, { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
    return <table className={`table-auto w-full border dark:border-dark-700 cursor-default`}>{children}</table>;
}

export function TableHead({ children }: { children: ReactNode }) {
    return (
        <thead>
            <tr className={`border bg-gray-100 dark:bg-dark-700 dark:border-dark-600`}>{children}</tr>
        </thead>
    );
}

export function TableHeader({ children }: { children: ReactNode }) {
    return <th className={`border dark:border-dark-600 px-2 py-2`}>{children}</th>;
}

export function TableBody({ children }: { children: ReactNode }) {
    return <thead> {children} </thead>;
}

export function TableRow({ children }: { children: ReactNode }) {
    return <tr className={`odd:bg-white even:bg-diluv-100 dark:odd:bg-dark-850 dark:even:bg-dark-800`}>{children}</tr>;
}

export function TableData({ children }: { children: ReactNode }) {
    return <td className={`border dark:border-dark-600 px-2 py-2`}>{children}</td>;
}
