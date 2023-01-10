import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { convertToDuration } from "../../utils/timeUtils";
import "./WorkoutPage.scss";

const exercises = [
    {
        name: "Punches",
        gifName: "Punches.gif",
        duration: 5
    },
    {
        name: "Jumping jacks",
        gifName: "JumpingJacks.gif",
        duration: 30
    }
]

const WorkoutPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [currWorkoutIndex, setCurrWorkoutIndex] = useState(0);

    // Timer states
    const [countdown, setCountdown] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSessionOngoing, setIsSessionOngoing] = useState(false);
    
    let navigate = useNavigate();

    const gifToPlay = require("../../public/workout-gifs/Punches.gif");

    useEffect(() => {
        // Load list of workouts based on difficulty
        const exerciseData = exercises;
        setWorkouts(exerciseData);

        // Potential structure of workout object
        // {name: "Punches", duration: 30, gifName: Punches.gif}
        setDuration(exerciseData[currWorkoutIndex].duration);
        // startTimer();
    }, []);

    useEffect(() => {
        if(workouts[currWorkoutIndex]){
            console.log("Duration use effect");
            setDuration(workouts[currWorkoutIndex].duration);
            setCountdown(0);
            startTimer();
        }else{
            setCountdown(0);
        }
    }, [currWorkoutIndex])

    const onReturnClick = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const onPlayButtonClick = (e) => {
        e.preventDefault();

        if(!isPaused){
            // Change image to still image
        }

        setIsPaused(prev => !prev);
    }

    const startTimer = () => {
        let interval = setInterval(() => {
            setCountdown((prevSecond) => {
                if(prevSecond === duration){
                    clearInterval(interval);
                    // Then we need to increase the currWorkoutIndex
                    setCurrWorkoutIndex(prev => prev + 1);
                    return prevSecond;
                }
            
                return prevSecond + 1;
            })
        }, 1000);
    }

    const stopTimer = () => {

    }

    const getTime = (duration) => {
        const endTime = Date.now() / 1000 + duration;
        console.log(endTime - (Date.now()/1000));
    }

    const addWorkoutIndex = (e) => {
        e.preventDefault();

        setCurrWorkoutIndex(prev => prev + 1);
    }

    return (
        <div className="workoutPage">
            <div className="row">
                <div className="col-1 my-2">
                    <button className="btn btn-primary" onClick={onReturnClick}>Return</button>
                </div>
            </div>
            <div className="workoutDemo">
                <h4>Workout name</h4>
                <div className="gifPlayer">
                    <div className="gifContainer">
                        <img className="workoutGif" src={!isPaused ? gifToPlay : ""} alt="Some gif"/>
                    </div>
                    <div className="row align-items-center justify-content-center mt-4">
                        <div className="timer">

                        </div>
                        <div className="col-1">
                            {convertToDuration(countdown)}
                        </div>
                        <div className="col-6">
                            <div className="progress my-auto">
                                <div className={`progress-bar w-${countdown}`} role="progressbar" aria-valuenow={countdown} aria-valuemin="0" aria-valuemax={duration}></div>
                                {/* <div className={`progress-bar w-20`} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="50"></div> */}
                            </div>
                        </div>
                        <div className="col-1">
                            <button className="playButton" onClick={onPlayButtonClick}>{isPaused ? "Play" : "Pause"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pagination">
          
            </div>
            <button onClick={addWorkoutIndex}>Add index</button>
            <button onClick={startTimer}>Start timer</button>
        </div>
    )
}

export default WorkoutPage;