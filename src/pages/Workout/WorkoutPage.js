import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
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
        name: "Jumping Jacks",
        gifName: "JumpingJacks.gif",
        duration: 10
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
    const [isCompleted, setIsCompleted] = useState(false);
    
    let navigate = useNavigate();

    const gifToPlay = require("../../public/workout-gifs/Punches.gif");

    useEffect(() => {
        // Load list of workouts based on difficulty
        const exerciseData = exercises;
        setWorkouts(exerciseData);

        // Potential structure of workout object
        // {name: "Punches", duration: 30, gifName: Punches.gif}
        setDuration(exerciseData[0].duration);
        // startTimer();
    }, []);

    useEffect(() => {
        if(currWorkoutIndex < workouts.length){
            console.log("Duration use effect", workouts[currWorkoutIndex].duration);
            setDuration(workouts[currWorkoutIndex].duration);
            setCountdown(0);
            startTimer(workouts[currWorkoutIndex].duration);
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

    const onFinishSession = () => {
        console.log("SESSION FINISHED! Show end session screen");
        setIsSessionOngoing(false);
        setIsCompleted(false);
    }

    const startTimer = (duration) => {
        console.log("Start timer with duration", duration);
        if(!isSessionOngoing){
            setIsSessionOngoing(true);
        }
        let interval = setInterval(() => {
            setCountdown((prevSecond) => {
                if(prevSecond === duration){
                    clearInterval(interval);
                    // Then we need to increase the currWorkoutIndex
                    if(currWorkoutIndex >= workouts.length - 1){
                        // Call the endgame function
                        onFinishSession();
                    }
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

    const getCurrentExerciseName = () => {
        const currExercise = exercises[currWorkoutIndex];

        if(!currExercise || !currExercise.name){
            return "";
        }

        return currExercise.name;
    }

    return (
        <div className="workoutPage">
            <div className="row">
                <div className="col-1 my-2">
                    {!isSessionOngoing ? <button className="btn btn-primary" onClick={onReturnClick}>Return</button> : <></>}
                </div>
            </div>
            <div className="workoutDemo">
                <h4>{getCurrentExerciseName()}</h4>
                <div className="gifPlayer">
                    <div className="gifContainer">
                        <img className="workoutGif" src={!isPaused ? gifToPlay : ""} alt="Some gif"/>
                    </div>
                    <div className="row align-items-center justify-content-center mt-4">
                        <div className="col-1">
                            {convertToDuration(countdown)}
                        </div>
                        <div className="col-6">
                            <ProgressBar animated now={countdown} max={duration}/>
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
            <button onClick={() => {startTimer(duration)}}>Start timer</button>
        </div>
    )
}

export default WorkoutPage;