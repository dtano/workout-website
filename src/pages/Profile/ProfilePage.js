import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import EditIcon from "../../components/EditIcon/EditIcon";
import NavBar from "../../components/NavBar/NavBar";
import "./ProfilePage.scss";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});
    // const [weight, setWeight] = useState(0);
    // const [height, setHeight] = useState(0);

    const navigate = useNavigate();

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

    const handleLogout = (e) => {
        console.log("LOGOUT");
        e.preventDefault();

        localStorage.setItem("user", null);
        navigate("/login");
    }

    return (
        <div className="mainContainer">
            <div className="d-flex justify-content-evenly">
                <div className="profileCard">
                    <div className="imgContainer">
                        <img src={require("../../public/images/user-profile.jpg")} alt="profile-pic"/>
                    </div>
                    <div className="userInfo">
                        <p className="fullName">Bernardo Silva</p>
                        <p>sample@email.com</p>
                        <p>22</p>
                    </div>
                    <div className="d-flex justify-content-end my-1">
                        <EditIcon isSmall={false}/>
                    </div>
                </div>
                <div className="infoContainer">
                    <div className="editContainer mb-4">
                        <div className="infoCard">
                            <h4>Weight <EditIcon isSmall={true}/></h4>
                            <p>70kg</p>
                        </div>
                        <div className="infoCard">
                            <h4>Height <EditIcon isSmall={true}/></h4>
                            <p>175cm</p>
                        </div>
                    </div>  
                    <div className="accountSettings">
                        <button className="hoverFade">Change Password</button>
                        <button className="hoverFade">Change Email</button>
                        <button className="hoverFade" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    )
}

export default ProfilePage;