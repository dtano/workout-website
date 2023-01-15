import {React} from "react";
import "./NavBar.scss";

const NavBar = () => {
    return (
        <nav className="navBar">
            <a className="hoverFade" href="/">HOME</a>
            <a className="hoverFade" href="/reports">REPORTS</a>
            <a className="hoverFade" href="/profile">ME</a>
        </nav>
    )
}

export default NavBar;