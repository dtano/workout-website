import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import "./ReportsPage.scss";

const ReportsPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading){
         setTimeout(() => {
             setIsLoading(false);
         }, 1000)
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
            <h1>Reports page</h1>
            <NavBar />
        </div>
     )
}

export default ReportsPage;