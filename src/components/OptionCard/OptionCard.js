import {React} from "react";
import { redirect, useNavigate } from "react-router";
import { getOptionImageName } from "../../utils/generalUtils";
import "./OptionCard.scss";

const OptionCard = ({optionDetails}) => {
    const {name, description} = optionDetails;
    let navigate = useNavigate();

    const onClick = (e) => {
        e.preventDefault();
        navigate(`/workout/${optionDetails?.id}`);
    }
    
    return (
        <div className="optionCard">
            <img src={require(`../../public/images/${getOptionImageName(name)}`)} alt="Person working out"/>
            <h4 className="optionTitle">{name}</h4>
            <p>{description}</p>
            <button className="hoverFade" onClick={onClick}>START</button>
        </div>
    )
}

export default OptionCard;