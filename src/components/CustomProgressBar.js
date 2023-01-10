import React from "react";

const CustomProgressBar = ({currentValue, maxValue}) => {
    return (
        <div className="progress my-auto">
            <div className={`progress-bar w-${currentValue}`} role="progressbar" aria-valuenow={`${currentValue}`} aria-valuemin="0" aria-valuemax={`${maxValue}`}>
                
            </div>
        </div>
    )

}

export default CustomProgressBar;