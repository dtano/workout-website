import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import "./ProfilePage.scss";

const ProfilePage = () => {
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
            <div className="container profilePage">
                <div className="col-3 profileCard">
                    <div className="imgContainer">
                        <img src={""} alt="profile-pic"/>
                    </div>
                    <div className="userInfo">
                        <p>Name: Sample</p>
                        <p>Birthdate: 17/10/2000 (22 years old)</p>
                        <p>Height: 175cm</p>
                    </div>
                </div>
                <div className="col-2 d-flex justify-content-between">
                    <div className="col-1">
                        <h3>Edit personal information</h3>
                    </div>
                    <div className="col-1">
                        <h3>Edit account information</h3>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    )
}

export default ProfilePage;