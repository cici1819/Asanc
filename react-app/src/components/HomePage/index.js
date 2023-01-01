import React, { useState } from "react";
import { useSelector } from 'react-redux';
import CurrentUserProject from "../Project/CurrentUserProject";
// import ProjectCreateModal from "../Project/ProjectCreateModal";
import ProjectCreate from '../Project/ProjectCreateModal/ProjectCreateForm';
import SideBar from "../SideBar/SideBar";
import { Modal } from '../../context/Modal';

import CurrentUserCollaborators from "./Collaborators/index"
import "./HomePage.css"
function HomePage({ show, toggle }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);
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

    const day = days[today.getDay() - 1]
    const month = months[today.getMonth()]
    const dateNumber = today.getDate()
    const homePageClass = show ? "homePage-open" : "homePage-closed"
    const titleClass = show ? "title-open" : "title-closed"

    return (<>
        <div className="home-page-sideBar">
            <SideBar show={show} toggle={toggle} />
        </div>


        <div className={homePageClass}>
            <div className={titleClass}>
                <div className='home-date'>{`${day}, ${month} ${dateNumber}`}</div>
                <div className="home-hello">Welcome, {`${sessionUser?.firstName}`}</div>
            </div>
            <div className="single-project-container">
                <CurrentUserProject />
                <div className="home-page-projectcreateModal" onClick={() => setShowModal(true)} >
                    <div className="homePage-create">
                        <div className="create-icon-homePage">
                            <i className="fa-regular fa-plus" id="create-server-plus" > </i>
                        </div>
                    </div>
                    <span className="create-title">
                        Create Project
                    </span>

                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ProjectCreate setShowModal={setShowModal} />
                    </Modal>
                )}

            </div>

            <div className="collaborator-div">
                <CurrentUserCollaborators />
            </div>

        </div>


    </>
















    )



















}


export default HomePage
