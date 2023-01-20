import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import EditIcon from "../../components/EditIcon/EditIcon";
import NavBar from "../../components/NavBar/NavBar";
import * as userApi from "../../api/userApi";
import * as weightHistoryApi from "../../api/weightHistoryApi";
import { getAge } from "../../utils/timeUtils";
import "./ProfilePage.scss";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    
    const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
    const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showUpdateWeightModal, setShowUpdateWeightModal] = useState(false);
    const [showUpdateHeightModal, setShowUpdateHeightModal] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [user, setUser] = useState({});
    
    const [weight, setWeight] = useState(0);
    const [newWeight, setNewWeight] = useState(0);
    // const [height, setHeight] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        // Get user details
        fetchData();
        if(isLoading){
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
    }, [isLoading]);

    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        
        const userInformationResponse = await userApi.getUserInformation(user.id);
        const userCurrentWeightResponse = await weightHistoryApi.getCurrentWeight(user.id);
        
        
        console.log("User info response", userInformationResponse);
        const userData = userInformationResponse?.data;
        const userWeight = userCurrentWeightResponse?.data?.weight;
        console.log("User weight", userWeight);
        
        setUser(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setBirthDate(userData.birth_date.slice(0,10));
        setEmail(userData.email);
        setCurrPassword("");
        setNewPassword("");
        setWeight(userWeight);
        
        // setWeight here and setHeight here
    }

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

        localStorage.removeItem("user");
        navigate("/login");
    }

    const onCloseModal = () => {
        closeModals();

        // Reset all updated fields back to normal
        resetUpdateFields();
    }

    const closeModals = () => {
        setShowUpdateInfoModal(false);
        setShowUpdateEmailModal(false);
        setShowChangePasswordModal(false);
        setShowUpdateWeightModal(false);
        setShowUpdateHeightModal(false);
        setError("");
    }

    const resetUpdateFields = () => {
        setFirstName(user?.first_name);
        setLastName(user?.last_name);
        setBirthDate(user?.birth_date.slice(0,10));
        setEmail(user?.email);
        setCurrPassword("");
        setNewPassword("");
        setNewWeight(0);
    }

    const openEmailModal = (e) => {
        e.preventDefault();
        setShowUpdateEmailModal(true);
    }

    const openPasswordModal = (e) => {
        e.preventDefault();
        setShowChangePasswordModal(true);
    }

    const openWeightModal = (e) => {
        e.preventDefault();
        setShowUpdateWeightModal(true);
    }

    const openHeightModal = (e) => {
        e.preventDefault();
        setShowUpdateHeightModal(true);
    }

    const updateUser = async (updateData) => {
        try{
            setIsLoadingUpdate(true);
            console.log("CALLING UPDATE API");
            const updateResponse = await userApi.updateUserInformation(user?.id, updateData);
            console.log(updateResponse);

            // If update is successful then just close the modal
            await fetchData();
            setIsLoadingUpdate(false);
            closeModals();
        }catch(err){
            console.log("SET ERROR  " + err.response.data);
            setError(err.response.data);
            setIsLoadingUpdate(false);
            console.log(err);
        }
    }

    const onSubmitUpdateUserInfo = async (e) => {
        e.preventDefault();
        const updateData = {
            firstName,
            lastName,
            birthDate
        }

        await updateUser(updateData);
    }

    const onSubmitUpdateEmail = async (e) => {
        e.preventDefault();
        const updateData = {
            email
        }

        await updateUser(updateData);
    }

    const onSubmitChangePassword = async (e) => {
        e.preventDefault();
        const updateData = {
            oldPassword: currPassword,
            password: newPassword
        };

        await updateUser(updateData);
    }

    const onSubmitUpdateWeight = async (e) => {
        e.preventDefault();
        if(newWeight <= 0) {
            setError("Weight cannot be 0 or lower");
            return;
        }
        // Get the new and current weight
        const updateData = {
            weight: newWeight
        }

        try {
            setIsLoadingUpdate(true);
            const response = await weightHistoryApi.updateWeight(user.id, updateData);
            await fetchData();
            setIsLoadingUpdate(false);
            onCloseModal();
        }catch(err){
            console.log(err.response.data);
            setError(err.response.data);
            setIsLoadingUpdate(false);
        }
    }

    const renderUpdateUserInfoModal = () => {
        return (
            <Modal show={showUpdateInfoModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="text-danger">*{error}</div>}
                    <form onSubmit={onSubmitUpdateUserInfo}>
                        <div className="form-group text-left mb-2">
                            <label>First Name</label>
                            <input className="form-control mt-1" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={isLoadingUpdate}></input>
                        </div>
                        <div className="form-group text-left mb-2">
                            <label>Last Name</label>
                            <input className="form-control mt-1" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={isLoadingUpdate}></input>
                        </div>
                        <div className="form-group text-left mb-2">
                            <label>Birth Date</label>
                            <input className="form-control mt-1" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} disabled={isLoadingUpdate}></input>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal} disabled={isLoadingUpdate}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmitUpdateUserInfo} disabled={isLoadingUpdate}>
                        Save {isLoadingUpdate && <Spinner />}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const renderUpdateEmailModal = () => {
        return (
            <Modal show={showUpdateEmailModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="text-danger">*{error}</div>}
                    <form>
                        <div className="form-group text-left mb-2">
                            <label>Email</label>
                            <input className="form-control mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmitUpdateEmail}>
                        Save {isLoadingUpdate && <Spinner />}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const renderChangePasswordModal = () => {
        return (
            <Modal show={showChangePasswordModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="text-danger">{error}</div>}
                    <form>
                        <div className="form-group text-left mb-2">
                            <label>Current Password</label>
                            <input className="form-control mt-1" type="password" value={currPassword} onChange={(e) => setCurrPassword(e.target.value)}></input>
                        </div>
                        <div className="form-group text-left mb-2">
                            <label>New Password</label>
                            <input className="form-control mt-1" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmitChangePassword}>
                        Save {isLoadingUpdate && <Spinner />}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const renderUpdateWeightModal = () => {
        return (
            <Modal show={showUpdateWeightModal} onHide={onCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Weight</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="text-danger">*{error}</div>}
                    <form>
                        <div className="form-group text-center mb-3">
                            <label className="mb-2">Current Weight</label>
                            <h2>{weight > 0 ? `${weight}kg` : "Not Set"}</h2>
                        </div>
                        <div className="form-group text-left mb-2">
                            <label>New Weight (kg)</label>
                            <input className="form-control mt-1" type="number" value={newWeight} onChange={(e) => setNewWeight(e.target.value)}></input>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmitUpdateWeight}>
                        Save {isLoadingUpdate && <Spinner />}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div className="mainContainer">
            <div className="d-flex justify-content-evenly">
                <div className="profileCard">
                    <div className="imgContainer">
                        <img src={require("../../public/images/user-profile.jpg")} alt="profile-pic"/>
                    </div>
                    <div className="userInfo">
                        <p className="fullName">{`${user?.first_name} ${user?.last_name}`}</p>
                        <p>{user?.email}</p>
                        <p>{getAge(user?.birth_date)}</p>
                    </div>
                    <div className="d-flex justify-content-end my-1">
                        <EditIcon isSmall={false} handleOnClick={setShowUpdateInfoModal}/>
                    </div>
                </div>
                <div className="infoContainer">
                    <div className="editContainer mb-4">
                        <div className="infoCard">
                            <h4>Weight <EditIcon isSmall={true} handleOnClick={openWeightModal}/></h4>
                            <p>{weight > 0 ? `${weight}kg` : "-"}</p>
                        </div>
                        <div className="infoCard">
                            <h4>Height <EditIcon isSmall={true} handleOnClick={openWeightModal}/></h4>
                            <p>175cm</p>
                        </div>
                    </div>  
                    <div className="accountSettings">
                        <button className="hoverFade" onClick={openPasswordModal}>Change Password</button>
                        <button className="hoverFade" onClick={openEmailModal}>Change Email</button>
                        <button className="hoverFade" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <NavBar />
            {renderUpdateUserInfoModal()}
            {renderUpdateEmailModal()}
            {renderChangePasswordModal()}
            {renderUpdateWeightModal()}
        </div>
    )
}

export default ProfilePage;