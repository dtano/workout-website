import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
    return (
        <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="mb-3 text-center">Workout Website</h3>
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to={"/login"}>
                Sign In
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Confirm Password"
              />
            </div>
            <div className="d-grid gap-2 my-3">
              <button type="submit" className="btn btn-danger">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default SignUpPage;