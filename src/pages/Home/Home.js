import {React, useEffect, useState} from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import OptionCard from "../../components/OptionCard/OptionCard";
import * as workoutApi from "../../api/workoutApi";

import "./Home.css";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [workoutOptions, setWorkoutOptions] = useState([]);

    useEffect(() => {
        fetchWorkoutOptions();
    }, []);

    useEffect(() => {
       if(isLoading){
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
       }
    }, [isLoading]);

    const fetchWorkoutOptions = async () => {
        const workoutsResponse = await workoutApi.getAllWorkouts();
        setWorkoutOptions(workoutsResponse?.data);
    }

    if(isLoading) {
        return (
            <div className="mainContainer">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="mainContainer">
            <OptionsContainer options={workoutOptions}/>
            <NavBar />
        </div>
    );
};

const OptionsContainer = ({options}) => {
    return (
        <ul className="optionsContainer">
            {
                options.map((optionDetails, idx) => (
                    <li key={idx}>
                        <OptionCard optionDetails={optionDetails}/>
                    </li>
                ))
            }
        </ul>
    )
}

export default Home;