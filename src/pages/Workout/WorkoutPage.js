import React, { useEffect, useRef, useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { getOptionImageName } from "../../utils/generalUtils";
import { convertToDuration } from "../../utils/timeUtils";
import * as workoutEventApi from "../../api/workoutEventApi";
import * as workoutApi from "../../api/workoutApi";
import "./WorkoutPage.scss";

/* TODO: 
   Profile Page

   Reports Page
   - General layout (DO THIS)
   - Graph (Weight vs Time)

   Backend
   - Database migrations
   - Workout routine API
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
        name: "Rest",
        gifName: "WaterBottle",
        type: "REST",
        duration: 15
    }
]

const WorkoutPage = () => {
    const [workout, setWorkout] = useState(null);
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
    let user = JSON.parse(localStorage.getItem("user"));
    let {id} = useParams();

    useEffect(() => {
        // Get all exercises from selectedWorkout
        fetchWorkoutInformation();

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

    const fetchWorkoutInformation = async () => {
        const workoutInfo = await workoutApi.getWorkoutById(id);
        setWorkout(workoutInfo?.data.workout);
        
        // Load list of workouts based on difficulty
        const exerciseData = workoutInfo?.data.exercises;
        console.log(exerciseData);
        setWorkouts(exerciseData);

        loadExerciseMedia(exerciseData);

        console.log(exerciseData[0].duration);
        setDuration(exerciseData[0].duration);
    }

    const loadExerciseMedia = (exerciseData) => {
        if(!exerciseData) return;

        // Loop through the exerciseData
        let map = {};
        exerciseData.forEach(workoutExercise => {
            // Check if the exercise exists in the media map
            console.log("Exercise data", exerciseData);
            const exerciseInfo = workoutExercise?.exercise;
            if(!map.hasOwnProperty(exerciseInfo.name)){
                map[exerciseInfo.name] = {
                    gif: require(`../../public/workout-gifs/${exerciseInfo.image_name}.gif`),
                    still: require(`../../public/workout-stills/${exerciseInfo.image_name}-still.png`)
                }
            }
        });

        console.log("Map", map);
        setExerciseMediaMap(map);
    }

    const onReturnClick = (e) => {
        e.preventDefault();
        navigate("/");
    }

    const onPlayButtonClick = (e) => {
        e.preventDefault();

        if(!isPaused){
            stopTimer();
        }else{
            startTimer(duration);
        }
    }

    const onFinishSession = async () => {
        try{
            const createEventResponse = await workoutEventApi.createUserWorkoutEvent(user?.id, {workoutId: workout?.id});
            setIsSessionOngoing(false);
            setIsCompleted(true);
            setIsPaused(true);
        }catch(err){
            console.log(err.response.data);
        }
    }

    const startTimer = (duration) => {
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
        const currExercise = workouts[currWorkoutIndex];

        if(!currExercise || !currExercise?.exercise.name){
            return "";
        }

        return currExercise?.exercise.name;
    }

    const getExerciseGif = () => {
        if(currWorkoutIndex >= workouts.length) return "";
        const currentExercise = workouts[currWorkoutIndex];
        if(!currentExercise || Object.keys(exerciseMediaMap).length === 0) return "";

        console.log("In exercise gif", currentExercise);
        if(isPaused){
            return exerciseMediaMap[currentExercise?.exercise.name].still;
        }

        return exerciseMediaMap[currentExercise?.exercise.name].gif;
    }

    const startProgram = (e) => {
        e.preventDefault();
        startTimer(duration);
    }

    const PreWorkout = () => {
        return (
            <div className="flexCenter">
                <div className="preWorkoutScreen">
                    <img src={require(`../../public/images/${getOptionImageName(workout?.name)}`)} alt="Some guy exercising"/>
                    <div className="textContainer">
                        <h2>{workout?.name}</h2>
                        <p className="description">
                            {workout?.description}
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
                    <p>Calories Burnt: {workout?.calories_burnt}kcal</p>
                    <p>Time Spent: {workout?.duration/60} minutes</p>
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
                        {currWorkoutIndex < workouts.length ? <img className="workoutGif" src={getExerciseGif()} alt="Some gif"/> : <></>}
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
            {renderWorkoutProgram()}
        </div>
    )
}

export default WorkoutPage;