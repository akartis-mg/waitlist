import React, { useState, useEffect } from 'react'
import './Header.css'
import logo from './177838.png'
import {

    Link
} from "react-router-dom";
//translation
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Header() {

    const { t, i18n } = useTranslation("");
    const [open, setOpen] = useState(true);


    const body = document.querySelector("body");

    function bodystyle(e) {
        document.body.classList.add('disabled');

    }

    function removestyle(e) {
        document.body.classList.remove('disabled');

    }

    // useEffect(() => {
    //     const navbar = document.querySelector(".navbars");
    //     window.addEventListener("scroll", () => {
    //         // setScroll(window.scrollY > 20);
    //         window.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
    //     });
    // }, [])

    //get auth
    const auth = useSelector((state) => state.auth.user);
    const authBusiness = useSelector((state) => state.authBusiness.userBusiness);


    return (
        <nav className={`${open ? "navbars" : "navbars show"} container-fluid sticky`}>
            <div className="content">

                <div className="logo" data-aos="zoom-in">
                    <a href="#"><img class="img-fluid header__logo" src={logo} alt="logo" /></a>

                </div>
                <div className="nav__menu mt-5">
                    <ul className="menu-list">
                        <div className={open ? "icon cancel-btn hide " : "icon cancel-btn"} onClick={() => { setOpen(!open); removestyle() }}>
                            <i className="fas fa-times"></i>
                        </div>
                        
                        {auth && auth.token?

                            <>
                            <li><Link to="/" onClick={() => { setOpen(true); removestyle() }}>Companies</Link></li>
                            <li><Link to="/my-reservation" onClick={() => { setOpen(true); removestyle() }}>My reservation</Link></li>
                            <li><a>{auth.firstname}</a></li>
                            <li><Link to="/logout" onClick={() => { setOpen(true); removestyle() }}>Logout</Link></li>
                            </> :
                        
                        authBusiness.token && authBusiness.type === "Superadmin" ? 
                            <>
                                <li><Link to="/" onClick={() => { setOpen(true); removestyle() }}>Companies</Link></li>
                                <li><Link to="/logout" onClick={() => { setOpen(true); removestyle() }}>Logout</Link></li>
                            </> : 

                        authBusiness.token && authBusiness.type === "Manager" ? 
                            
                            <>
                            <li><Link to="/" onClick={() => { setOpen(true); removestyle() }}>My branches</Link></li>
                            <li><Link to="/list" onClick={() => { setOpen(true); removestyle() }}>Reservation list</Link></li>
                            <li><Link to="/logout" onClick={() => { setOpen(true); removestyle() }}>Logout</Link></li>
                            </> : 

                        authBusiness.token && authBusiness.type === "Staff" ? 
                            <>
                            <li><Link to="/list" onClick={() => { setOpen(true); removestyle() }}>Reservation list</Link></li>
                            <li><Link to="/logout" onClick={() => { setOpen(true); removestyle() }}>Logout</Link></li>
                            </> :  

                            <>
                            <li><Link to="/" onClick={() => { setOpen(true); removestyle() }}>Companies</Link></li>
                            <li><Link to="/login" onClick={() => { setOpen(true); removestyle() }}>Login</Link></li>
                            </> 

                        }
                     
{/* 
                        <li><Link to="/" onClick={() => { setOpen(true); removestyle() }}>{t("header.menu.home")}</Link></li>
                        <li><a href="#">Menu </a></li>
                        <li><a href="#">{t("header.menu.features")}</a></li>
                        <li><a href="#">{t("header.menu.pricing")} </a></li>
                        <li><Link to="/contact" onClick={() => { setOpen(true); removestyle() }}>{t("header.menu.contact")}</Link></li>
                      
                        <li><Link to="/login" onClick={() => { setOpen(true); removestyle() }}>Login</Link></li> */}
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
