import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as authApi from "../../api/authApi";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Make the register body
    const registerUserBody = {
      firstName,
      lastName,
      email,
      birthDate,
      password,
      confirmPassword
    }

    try{
      setIsLoading(true);
      const response = await authApi.register(registerUserBody);
      setIsLoading(false);
      if(!response){
        throw new Error("Failed to register");
      }

      // Or make this page navigate to a registration success page
      navigate("/login");
    }catch(err){
      console.log(err);
      setIsLoading(false);
      setError(err.message);
      return;
    }
  }

  return (
      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleRegister}>
        <div className="Auth-form-content">
          <h3 className="mb-3 text-center">Workout Website</h3>
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to={"/login"}>
              Sign In
            </Link>
          </div>
          {error && <p className="text-danger">{`*${error}`}</p>}
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mt-3">
            <label>Birth Date</label>
            <input
              type="date"
              className="form-control mt-1"
              placeholder="Birth Date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="d-grid gap-2 my-3">
            <button type="submit" className="btn btn-danger" disabled={isLoading}>
              Register {isLoading && <Spinner />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;