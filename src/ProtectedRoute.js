import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    let user = JSON.parse(localStorage.getItem("user"));
    if(!user){
        console.log("Redirect due to logged out user");
        return <Navigate to={"/login"} replace />
    }

    return children;
}

export default ProtectedRoute;