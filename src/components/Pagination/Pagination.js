import React, { useEffect, useState } from "react";
import "./Pagination.scss";

const Pagination = ({totalExercises, activeExerciseIdx, pageRangeDisplayed}) => {
    const [pagesToDisplay, setPagesToDisplay] = useState([]);
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(0);
    
    useEffect(() => {
        let pages = [];
        for(let i = 1; i <= totalExercises; i++){
            pages.push(i);
        }

        let lowerBound = Math.floor(activeExerciseIdx/pageRangeDisplayed) * pageRangeDisplayed;
        let upperBound = lowerBound + pageRangeDisplayed;

        setLowerBound(lowerBound);
        setUpperBound(upperBound);

        let slicedPages = pages.slice(lowerBound, upperBound);
        setPagesToDisplay(slicedPages);
    }, [activeExerciseIdx]);
    

    const Arrow = ({isRight}) => {
        return (
            <div className="arrowContainer">
                <span className="arrow">{isRight ? ">" : "<"}</span>
            </div>
        )
    }

    return (
        <div className="container pagination justify-content-md-center">
            {lowerBound > 0 ? <Arrow isRight={false}/> : <></>}
            {
                pagesToDisplay.map((page, index) => {
                    let currIndex = page - 1;
                    if(currIndex === activeExerciseIdx){
                        return <span key={index} className="circle activeExercise"></span>
                    }else if(currIndex < activeExerciseIdx){
                        return <span key={index}className="circle completedExercise"></span>
                    }

                    return <span className={`circle`} key={index}></span>
                })
            }
            {upperBound < totalExercises ?  <Arrow isRight={true}/> : <></>}
        </div>
    )
}

export default Pagination;