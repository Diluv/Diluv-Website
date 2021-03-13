import React from "react";

const ProgressBar = ({ completed }: { completed: number }) => {
    return (
        <div className={`relative bg-gray-200 dark:bg-dark-800 border-gray-300 dark:border-dark-700`}>
            <div style={{ left: `calc(${completed}% - 1.5rem)`, top: "-2.5rem" }} className={`absolute align-top text-right`}>
                <span className={`p-2 text-white bg-diluv-800`}>{`${Math.round(completed * 100) / 100}%`}</span>
            </div>
            <div style={{ width: `${completed}%` }} className={`bg-diluv-500 h-8`} />
        </div>
    );
};

export default ProgressBar;
