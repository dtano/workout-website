import React, { useEffect, useState } from "react";
import "./Pagination.scss";

const Pagination = ({totalExercises, activeExerciseIdx, pageRangeDisplayed}) => {
    const [pagesToDisplay, setPagesToDisplay] = useState([]);
    const [lowerBound, setLowerBound] = useState(0);
    const [upperBound, setUpperBound] = useState(0);
    
    useEffect(() => {
        console.log("Use effect")
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
                pagesToDisplay.map((page) => {
                    let currIndex = page - 1;
                    if(currIndex === activeExerciseIdx){
                        return <span className="circle activeExercise"></span>
                    }else if(currIndex < activeExerciseIdx){
                        return <span className="circle completedExercise">{page}</span>
                    }

                    return <span className={`circle`} key={currIndex}></span>
                })
            }
            {upperBound < totalExercises ?  <Arrow isRight={true}/> : <></>}
        </div>
    )
}

export default Pagination;