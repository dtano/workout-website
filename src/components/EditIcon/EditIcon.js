import React from "react";

const EditIcon = ({isSmall, handleOnClick}) => {
    return (
        <img className={isSmall ? "pencilIconSmall" : "pencilIcon"} src={require("../../public/images/PencilIcon.png")} alt="edit icon" onClick={handleOnClick}/>
    )
}

export default EditIcon;