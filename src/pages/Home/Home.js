import {React} from "react";
import NavBar from "../../components/NavBar/NavBar";
import OptionCard from "../../components/OptionCard/OptionCard";

import "./Home.css";

const Home = () => {
    return (
        <div className="mainContainer">
            <OptionsContainer />
            <NavBar />
        </div>
    )
};

const OptionsContainer = () => {
    const options = [
        {
            title: "Beginner",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.",
            imageName: "workout-beginner.jpg"
        },
        {
            title: "Intermediate",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.",
            imageName: "workout-intermediate.jpg"
        },
        {
            title: "Advanced",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi consectetur quae maiores adipisci. Quibusdam odio porro quis quia quae? Atque quis dolor vitae pariatur deleniti excepturi maxime consequuntur accusantium cum.",
            imageName: "workout-advanced.jpg"
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