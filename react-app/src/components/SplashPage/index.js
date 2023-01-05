import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import asancLogo from "../../img/asanc-logo.png"
import mainImg from "../../img/main-pic.jpg"
import listImg from "../../img/side-img4.png"
import './SplashPage.css';


function SplashPage() {
    const currentUser = useSelector(state => state.session.user)
    if (currentUser) return <Redirect to="/home"></Redirect>
    return (
        <div className="splash-page-container">

            <div className="nav-bar-section">
                <div className="nav-bar-left">
                    <img src={asancLogo} alt="logo" className="logo-img" />
                    <span className="logo-name">
                        Asanc
                    </span>
                </div>
                <div className="nav-bar-right">
                    <NavLink to={"/login"}>
                        <div id="home-login-button">Log In</div>
                    </NavLink>
                    <NavLink to={'/sign-up'}>
                        <button id="home-signUp">
                            Get Started
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className="main-content">
                <div className="main-pic-container">
                    <div className="main-title-left">
                        <h1 className="h-t-1">Are silos making</h1>
                        <h1 className="h-t-2">teamwork more </h1>
                        <h1 className="h-t-3">painful?</h1>
                        <div className="seprate-line">____________</div>
                        <div className="info-main"><p>Asanc helps you manage projects, focus on
                            <p>what’s important, and organize work in one </p>
                            <p></p>place for seamless collaboration.</p>
                        </div>
                        <div className="signup2">
                            <NavLink to={'/sign-up'}>
                                <button id="home-signUp2">
                                    Get Started
                                </button>
                            </NavLink>
                        </div>
                    </div>
                    <div className="main-img-right">
                        <img src={mainImg} alt="main-img" />
                    </div>

                </div>

                <div className="main-content-section2">
                    <div className="main-section2-left">
                        <h4>PROJECT MANAGEMENT</h4>
                        <h1 className="p-m-title1">Stay organized and</h1>
                        <h1 className="p-m-title2">connected</h1>
                        <p className="p-p-m1">Bring your team’s work together in one shared space.</p>
                        <p className="p-p-m2">Choose the project view that suits your style, and</p>
                        <p className="p-p-m3">collaborate no matter where you are.</p>

                    </div>
                    <div className="main-img-right2">
                        <img src={listImg} alt="p-m-title" />
                    </div>
                </div>
                <div className="section3">
                    <img src={asancLogo} alt="logo" className="logo-img2" />
                    <h1 className="l-h1-1">See everything the team’s working</h1>
                    <h1 className="l-h1-2">on in one place.</h1>
                    <div className="signup3">
                        <NavLink to={'/sign-up'}>
                            <button id="home-signUp3">
                                Get Started
                            </button>
                        </NavLink>
                    </div>
                    <div className="seprate-line2"></div>
                    <div className="about-link-splash">
                        <span>Create by Cici Cheng </span>
                        <NavLink className="github-link"
                            to={{
                                pathname: "https://github.com/cici1819",
                            }}
                            target="_blank"
                        >
                            <div className="logo-gitHub">
                                <BsGithub size="3em" />
                            </div>
                        </NavLink>
                        <NavLink
                            to={{
                                pathname: "https://www.linkedin.com/in/cici-cheng-87386a259/",
                            }}
                            target="_blank"
                        >
                            <div className="linkedin-link">
                                <BsLinkedin size="3em" />
                            </div>
                        </NavLink>
                    </div>
                </div>

            </div>




        </div>















    )






}

export default SplashPage
