import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import EditIcon from "../../components/EditIcon/EditIcon";
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
        // <div className="mainContainer">
        //     <div className="container profilePage">
        //         <div className="profileCard">
        //             <div className="imgContainer">
        //                 <img src={""} alt="profile-pic"/>
        //             </div>
        //             <div className="userInfo">
        //                 <p>Bernardo Silva</p>
        //                 <p>sample@email.com</p>
        //                 <p>22</p>
        //             </div>
        //         </div>
        //         <div className="d-flex justify-content-between">
        //             <div className="infoContainer">
        //                 <div className="infoCard">
        //                     <h4>Weight</h4>
        //                     <p>75kg</p>
        //                 </div>
        //                 <div className="infoCard">
        //                     <h4>Height</h4>
        //                     <p>175cm</p>
        //                 </div>
        //             </div>
        //             <div>
        //                 <div className="infoCard">
        //                     <h4>Weight</h4>
        //                     <p>75kg</p>
        //                 </div>
        //                 <div className="infoCard">
        //                     <h4>Height</h4>
        //                     <p>175cm</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <NavBar />
        // </div>
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
                        <button className="hoverFade">Logout</button>
                    </div>
                </div>
            </div>
            <NavBar />
        </div>
    )
}

export default ProfilePage;