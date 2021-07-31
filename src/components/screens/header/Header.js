import React, { useState } from 'react'
import './Header.css'
import logo from './177838.png'
import {

    Link
} from "react-router-dom";
function Header() {
    const [open, setOpen] = useState(true);


    const body = document.querySelector("body");

    function bodystyle(e) {
        document.body.classList.add('disabled');

    }

    function removestyle(e) {
        document.body.classList.remove('disabled');

    }

    return (
        <nav className={`${open ? "navbars" : "navbars show"} container-fluid`}>
            <div className="content">

                <div className="logo" data-aos="zoom-in">
                    <a href="#"><img class="img-fluid header__logo" src={logo} alt="logo" /></a>

                </div>
                <div className="nav__menu mt-5">
                    <ul className="menu-list">
                        <div className={open ? "icon cancel-btn hide " : "icon cancel-btn"} onClick={() => { setOpen(!open); removestyle() }}>
                            <i className="fas fa-times"></i>
                        </div>
                        <li><Link to="/" onClick={() => { setOpen(true); removestyle() }}>Home</Link></li>
                        <li><a href="#">Menu </a></li>
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Princing </a></li>
                        <li><Link to="/contact" onClick={() => { setOpen(true); removestyle() }}>Contact</Link></li>
                        <li><Link to="/login" onClick={() => { setOpen(true); removestyle() }}>Login</Link></li>
                    </ul>
                </div>

                <div className={open ? "icon menu-btn " : "icon menu-btn hide"} onClick={() => { setOpen(!open); bodystyle() }}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav >


    )
}

export default Header
