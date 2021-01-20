import React from "react";

const ProgressBar = ({ completed }: { completed: number }) => {

    return (
        <div className={`bg-gray-200 dark:bg-dark-800 border-gray-300 dark:border-dark-700`}>
            <div style={{ width: `${completed}%` }} className={`bg-diluv-500 text-black p-1 text-center`}>
                <span >{`${Math.round(completed * 100) / 100 }%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;