import {React} from "react";
import "./OptionCard.scss";

const OptionCard = ({optionDetails}) => {
    const {title, description, imageName} = optionDetails;
    const image = require(`../../public/images/${imageName}`);
    return (
        <div className="optionCard">
            <img src={image} alt="Person working out"/>
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="hoverFade">START</button>
        </div>
    )
}

export default OptionCard;