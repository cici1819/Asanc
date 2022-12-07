import React, { useState } from "react";
import { useSelector } from 'react-redux';
import CurrentUserProject from "../Project/CurrentUserProject";
import ProjectCreateModal from "../Project/ProjectCreateModal";

import SideBar from "../SideBar/SideBar";

import CurrentUserCollaborators from "./Collaborators/index"
import "./HomePage.css"
function HomePage({ show, toggle }) {
    const sessionUser = useSelector(state => state.session.user);
    const today = new Date()

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const day = days[today.getDay()]
    const month = months[today.getMonth()]
    const dateNumber = today.getDate()
    return (
        <div className="home-page-container">


            <div className="home-page-sideBar">
                <SideBar show={show} toggle={toggle} />
            </div>
            <div className='top-title'>
                <div className='home-date'>{`${day}, ${month} ${dateNumber}`}</div>
                <div className="home-hello">Welcome, {`${sessionUser?.firstName}`}</div>
            </div>
            <div className="single-project-container">
                <CurrentUserProject />
                <div className="home-page-projectcreateModal">
                    <span className="create-title">
                        Create Project
                    </span>
                    <div className="HomePage-create">
                        <div className="create-icon-homePage">
                            <ProjectCreateModal />
                        </div>
                    </div>

                </div>

            </div>
            <div>
                <div>
                    <CurrentUserCollaborators />
                </div>

            </div>

        </div>















    )



















}


export default HomePage
