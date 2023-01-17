import {React, useEffect, useState} from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import OptionCard from "../../components/OptionCard/OptionCard";

import "./Home.css";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    console.log(localStorage.getItem("user"));

    useEffect(() => {
       if(isLoading){
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
       }
    }, [isLoading]);

    if(isLoading) {
        return (
            <div className="mainContainer">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="mainContainer">
            <OptionsContainer />
            <NavBar />
        </div>
    );
};

const OptionsContainer = () => {
    const options = [
        {
            title: "Beginner",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.",
            imageName: "workout-beginner.jpg",
            difficulty: "beginner"
        },
        {
            title: "Intermediate",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.",
            imageName: "workout-intermediate.jpg",
            difficulty: "intermediate"
        },
        {
            title: "Advanced",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.",
            imageName: "workout-advanced.jpg",
            difficulty: "hard"
        }
    ]

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