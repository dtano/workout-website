import React from "react";
import { Link } from "react-router-dom";
import './LoginPage.scss';

const LoginPage = () => {
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="mb-3 text-center">Workout Website</h3>
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3 text-left">
                        <label>Email address</label>
                        <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-danger">
                            Login
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