import React, { useEffect, useRef, useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { convertToDuration } from "../../utils/timeUtils";
import "./WorkoutPage.scss";

/* TODO: 
   Workout Page

   Profile Page
   - Edit modals (DO THIS)

   Reports Page
   - General layout (DO THIS)
   - Graph (Weight vs Time)

   Login Page
   - Functionality 
   - Make this the default page

   Register Page
   - Functionality

   Backend
   - Initial setup (Repo and just making it run) (DO THIS)
   - Database migrations
   - Authentication API
   - Workout routine API
   - User information API
*/

const exercises = [
    {
        name: "Punches",
        gifName: "Punches",
        type: "EXERCISE",
        duration: 5
    },
    {
        name: "Jumping Jacks",
        gifName: "JumpingJacks",
        type: "EXERCISE",
        duration: 10
    },
    {
        name: "Rest",
        gifName: "WaterBottle",
        type: "REST",
        duration: 15
    },
    {
        name: "Punches",
        gifName: "Punches",
        type: "EXERCISE",
        duration: 5
    },
    {
        name: "Jumping Jacks",
        gifName: "JumpingJacks",
        type: "EXERCISE",
        duration: 10
    },
    {
        name: "Rest",
        gifName: "WaterBottle",
        type: "REST",
        duration: 15
    },
    {
        name: "Punches",
        gifName: "Punches",
        type: "EXERCISE",
        duration: 5
    },
    {
        name: "Jumping Jacks",
        gifName: "JumpingJacks",
        type: "EXERCISE",
        duration: 10
    },
    {
        name: "Rest",
        gifName: "WaterBottle",
        type: "REST",
        duration: 15
    },
    {
        name: "Punches",
        gifName: "Punches",
        type: "EXERCISE",
        duration: 5
    },
    {
        name: "Jumping Jacks",
        gifName: "JumpingJacks",
        type: "EXERCISE",
        duration: 10
    },
    {
        name: "Rest",
        gifName: "WaterBottle",
        type: "REST",
        duration: 15
    }
]

const WorkoutPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [workouts, setWorkouts] = useState([]);
    const [currWorkoutIndex, setCurrWorkoutIndex] = useState(0);

    // Timer states
    const [countdown, setCountdown] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSessionOngoing, setIsSessionOngoing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    // Exercise media related state
    const [exerciseMediaMap, setExerciseMediaMap] = useState({});
    
    let navigate = useNavigate();
    let interval = useRef(null);

    useEffect(() => {
        // Load list of workouts based on difficulty
        const exerciseData = exercises;
        setWorkouts(exerciseData);

        // Set gif and still (Maybe it'll be better if I load all gifs and stills at once)
        loadExerciseMedia(exerciseData);

        // Potential structure of workout object
        // {name: "Punches", duration: 30, gifName: Punches.gif}
        setDuration(exerciseData[0].duration);
        // startTimer();

        if(isLoading){
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
    }, []);

    useEffect(() => {
        if(currWorkoutIndex < workouts.length){
            const currentExercise = workouts[currWorkoutIndex];
            setDuration(currentExercise.duration);
            setCountdown(0);
            startTimer(currentExercise.duration);
        }else{
            setCountdown(0);
        }
    }, [currWorkoutIndex])

    const loadExerciseMedia = (exerciseData) => {
        if(!exerciseData) return;

        // Loop through the exerciseData
        let map = {};
        exerciseData.forEach(exercise => {
            // Check if the exercise exists in the media map
            if(!map.hasOwnProperty(exercise.name)){
                map[exercise.name] = {
                    gif: require(`../../public/workout-gifs/${exercise.gifName}.gif`),
                    still: require(`../../public/workout-stills/${exercise.gifName}-still.png`)
                }
            }
        });

        setExerciseMediaMap(map);
    }

    const onReturnClick = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const onPlayButtonClick = (e) => {
        e.preventDefault();

        if(!isPaused){
            // Change image to still image
            stopTimer();
        }else{
            startTimer(duration);
        }
    }

    const onFinishSession = () => {
        setIsSessionOngoing(false);
        setIsCompleted(true);
        setIsPaused(true);
    }

    const startTimer = (duration) => {
        console.log("Start timer with duration", duration);
        if(!isSessionOngoing){
            setIsSessionOngoing(true);
        }

        interval.current = setInterval(() => {
            setCountdown((prevSecond) => {
                if(prevSecond === duration){
                    clearInterval(interval.current);
                    if(currWorkoutIndex >= workouts.length - 1){
                        onFinishSession();
                    }

                    setCurrWorkoutIndex(prev => prev + 1);
                    return prevSecond;
                }

                return prevSecond + 1;
            })
        }, 1000);

        setIsPaused(false);
    }

    const stopTimer = () => {
        clearInterval(interval.current);
        setIsPaused(true);
    }

    const getCurrentExerciseName = () => {
        const currExercise = exercises[currWorkoutIndex];

        if(!currExercise || !currExercise.name){
            return "";
        }

        return currExercise.name;
    }

    const getExerciseGif = () => {
        const currentExercise = workouts[currWorkoutIndex];
        if(!currentExercise || Object.keys(exerciseMediaMap).length === 0) return "";

        console.log("In exercise gif", exerciseMediaMap);
        if(isPaused){
            return exerciseMediaMap[currentExercise.name].still;
        }

        return exerciseMediaMap[currentExercise.name].gif;
    }

    const startProgram = (e) => {
        e.preventDefault();
        startTimer(duration);
    }

    const PreWorkout = () => {
        return (
            <div className="flexCenter">
                <div className="preWorkoutScreen">
                    <img src={require("../../public/images/workout-beginner.jpg")} alt="Some guy exercising"/>
                    <div className="textContainer">
                        <h2>Beginner</h2>
                        <p className="description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.
                        </p>
                        <button onClick={startProgram}>START</button>
                    </div>
                </div>
            </div>
        )
    }

    const PostWorkout = () => {
        return (
            <div className="flexCenter">
                <div className="postWorkoutScreen">
                    <h2>Workout Done!</h2>
                    <p>Calories Burnt: 2000kcal</p>
                    <p>Time Spent: 20 minutes</p>
                    <button className="btn-red" onClick={onReturnClick}>EXIT</button>
                </div>
            </div>
        )
    }

    const renderWorkoutProgram = () => {
        if(!isSessionOngoing && !isCompleted){
            return (
                <PreWorkout />
            );
        }

        if(isCompleted && !isSessionOngoing){
            return (
                <PostWorkout />
            )
        }

        return (
            <div className="workoutDemo">
                <h4>{getCurrentExerciseName()}</h4>
                <div className="gifPlayer">
                    <div className="gifContainer">
                        <img className="workoutGif" src={getExerciseGif()} alt="Some gif"/>
                    </div>
                    <div className="row align-items-center justify-content-center mt-4">
                        <div className="col-1">
                            {convertToDuration(countdown)}
                        </div>
                        <div className="col-6">
                            {isPaused ? <ProgressBar now={countdown} max={duration}/> : <ProgressBar animated now={countdown} max={duration}/>}
                        </div>
                        <div className="col-1">
                            <button className="playButton" onClick={onPlayButtonClick} disabled={isCompleted || !isSessionOngoing}>{isPaused ? "Play" : "Pause"}</button>
                        </div>
                    </div>
                </div>
                <Pagination totalExercises={workouts?.length ? workouts.length : 0} 
                activeExerciseIdx={currWorkoutIndex}
                pageRangeDisplayed={12}
                />
            </div>
        )
    }

    if(isLoading){
        return (
            <div className="mainContainer">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="workoutPage">
            <div className="row top-left m-2">
                <div className="col-1 my-2">
                    {!isSessionOngoing ? <button className="btn btn-primary" onClick={onReturnClick}>Return</button> : <></>}
                </div>
            </div>
            {/*workoutDemo can potentially be its own component*/}
            {renderWorkoutProgram()}
            <div className="pagination">
                
            </div>
        </div>
    )
}

export default WorkoutPage;