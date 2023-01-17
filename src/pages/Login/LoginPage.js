import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.scss';
import * as authApi from "../../api/authApi";
import { Spinner } from "react-bootstrap";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginDetails = {
            email,
            password
        };

        console.log("Login details", loginDetails);

        try{
            setIsLoading(true);
            const response = await authApi.login(loginDetails);
            console.log(response);
            setIsLoading(true);
            if(!response){
                throw new Error("Failed login")
            }

            localStorage.setItem("user", JSON.stringify(response.data));
            setEmail("");
            setPassword("");

            navigate('/');
        }catch(err){
            console.log(err);
            setIsLoading(false);
            setLoginError(err.message);
            return;
        }
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleLogin}>
                <div className="Auth-form-content">
                    <h3 className="mb-3 text-center">Workout Website</h3>
                    <h3 className="Auth-form-title">Sign In</h3>
                    {loginError ? <p className="text-danger">*Failed to login</p> : <></>}
                    <div className="form-group mt-3 text-left">
                        <label>Email address</label>
                        <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-danger" disabled={isLoading}>
                            Login {isLoading && <Spinner />}
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        <p>Not a member? <Link to={"/register"}>Register</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;