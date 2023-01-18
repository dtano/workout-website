import {React} from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
    return (
        <nav className="navBar">
            <Link className="hoverFade" to={"/"}>HOME</Link>
            <a className="hoverFade" href="/reports">REPORTS</a>
            <Link className="hoverFade" to={"/profile"}>ME</Link>
        </nav>
    )
}

export default NavBar;