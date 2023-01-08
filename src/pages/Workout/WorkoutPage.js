import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WorkoutPage.scss";

const WorkoutPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    const gifToPlay = require("../../public/workout-gifs/Punches.gif");

    const onReturnClick = (e) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="workoutPage">
            <button className="btn-blue" onClick={onReturnClick}>Return</button>
            <div className="workoutDemo">
                <h4>Workout name</h4>
                <div className="gifPlayer">
                    <img className="workoutGif" src={gifToPlay} alt="Some gif"/>
                    {/* <div className="progressSection">
                        <p>00:00</p>
                        <div className="progress w-50 my-auto mx-4">
                            <div className="progress-bar w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <button className="playButton">Pause</button>
                    </div> */}
                    <div className="row align-items-center justify-content-center mt-4">
                        <div className="col-1">
                            {"00:00"}
                        </div>
                        <div className="col-6">
                            <div className="progress my-auto">
                                <div className="progress-bar w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div className="col-1">
                            <button className="playButton">Pause</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pagination">

            </div>
        </div>
    )
}

export default WorkoutPage;