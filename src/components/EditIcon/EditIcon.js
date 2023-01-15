import React from "react";

const EditIcon = ({isSmall}) => {
    return (
        <img className={isSmall ? "pencilIconSmall" : "pencilIcon"} src={require("../../public/images/PencilIcon.png")} alt="edit icon"/>
    )
}

export default EditIcon;