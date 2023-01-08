import {React} from "react";
import { redirect, useNavigate } from "react-router";
import "./OptionCard.scss";

const OptionCard = ({optionDetails}) => {
    const {title, description, imageName, difficulty} = optionDetails;
    const image = require(`../../public/images/${imageName}`);

    let navigate = useNavigate();
    
    const onClick = (e) => {
        e.preventDefault();

        // Navigate to new link

        // Set chosen difficulty here as well
        // can use context or local storage
        navigate('/workout');
    }
    
    return (
        <div className="optionCard">
            <img src={image} alt="Person working out"/>
            <h4 className="optionTitle">{title}</h4>
            <p>{description}</p>
            <button className="hoverFade" onClick={onClick}>START</button>
        </div>
    )
}

export default OptionCard;