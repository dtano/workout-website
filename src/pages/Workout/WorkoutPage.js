import React, { useEffect, useRef, useState } from "react";
import { ProgressBar, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { getOptionImageName } from "../../utils/generalUtils";
import { convertToDuration } from "../../utils/timeUtils";
import * as workoutEventApi from "../../api/workoutEventApi";
import * as workoutApi from "../../api/workoutApi";
import "./WorkoutPage.scss";

const WorkoutPage = () => {
    const [workout, setWorkout] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [currExerciseIndex, setCurrExerciseIndex] = useState(0);

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
        if(currExerciseIndex < workoutExercises.length){
            const currentExercise = workoutExercises[currExerciseIndex];
            setDuration(currentExercise.duration);
            setCountdown(0);
            startTimer(currentExercise.duration);
        }else{
            setCountdown(0);
        }
    }, [currExerciseIndex])

    const fetchWorkoutInformation = async () => {
        const workoutInfo = await workoutApi.getWorkoutById(id);
        setWorkout(workoutInfo?.data.workout);
        
        // Load list of workouts based on difficulty
        const exerciseData = workoutInfo?.data.exercises;
        console.log(exerciseData);
        setWorkoutExercises(exerciseData);

        loadExerciseMedia(exerciseData);
        setDuration(exerciseData[0].duration);
    }

    const loadExerciseMedia = (exerciseData) => {
        if(!exerciseData) return;

        let map = {};
        exerciseData.forEach(workoutExercise => {
            // Check if the exercise exists in the media map
            const exerciseInfo = workoutExercise?.exercise;
            if(!map.hasOwnProperty(exerciseInfo.name)){
                map[exerciseInfo.name] = {
                    gif: require(`../../public/workout-gifs/${exerciseInfo.image_name}.gif`),
                    still: require(`../../public/workout-stills/${exerciseInfo.image_name}-still.png`)
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
            stopTimer();
        }else{
            startTimer(duration);
        }
    }

    const onFinishSession = async () => {
        try{
            await workoutEventApi.createUserWorkoutEvent(user?.id, {workoutId: workout?.id});
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
                    if(currExerciseIndex >= workoutExercises.length - 1){
                        onFinishSession();
                    }

                    setCurrExerciseIndex(prev => prev + 1);
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
        const currExercise = workoutExercises[currExerciseIndex];

        if(!currExercise || !currExercise?.exercise.name){
            return "";
        }

        return currExercise?.exercise.name;
    }

    const getExerciseGif = () => {
        console.log("Get exercise gif");
        if(currExerciseIndex >= workoutExercises.length) return "";
        const currentExercise = workoutExercises[currExerciseIndex];
        if(!currentExercise || Object.keys(exerciseMediaMap).length === 0) return "";

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
                <h3 className="mb-4">{getCurrentExerciseName()}</h3>
                <div className="gifPlayer">
                    <div className="gifContainer">
                        {currExerciseIndex < workoutExercises.length ? <img className="workoutGif" src={getExerciseGif()} alt="Some gif"/> : <></>}
                    </div>
                    <div className="center-flex mt-4">
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
                <Pagination totalExercises={workoutExercises?.length ? workoutExercises.length : 0} 
                activeExerciseIdx={currExerciseIndex}
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
                    <button className="btn btn-primary" onClick={onReturnClick}>Return</button>
                </div>
            </div>
            {renderWorkoutProgram()}
        </div>
    )
}

export default WorkoutPage;