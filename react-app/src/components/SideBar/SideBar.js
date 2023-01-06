import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserProjects } from "../../store/projectReducer";
import LogoutButton from "../auth/LogoutButton";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import logo from "../../img/asanc-logo.png"
import "./SideBar.css"
import ProjectCreateModal from "../Project/ProjectCreateModal";
import { NavLink, Link } from "react-router-dom";
import CurrentUserInfo from "../Project/UsersInOneProject/CurrentUserProfile";



const SideBar = ({ show, toggle }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user)
    console.log("!!!!!!!!!!!!!!", currentUser)
    const sidebarClass = show ? "sidebar-open" : "sidebar-closed"
    const projects = useSelector(state => state.projects.allProjects);
    const projectsArr = Object.values(projects);
    // const [openMiddleSidebar, setOpenMilddleSideBar] = useState(true)

    // const openSidebar = () => {
    //     if (openMiddleSidebar) return;
    //     else setOpenMilddleSideBar(false);
    // }
    // const closeSideBar = () => {
    //     if (!openMiddleSidebar) return;
    //     setOpenMilddleSideBar(false);
    // };



    useEffect(() => {
        dispatch(getCurrUserProjects())
    }, [dispatch]);

    // if (!projects || !projectsArr.length) {
    //     return null
    // }
    return (
        <>
            <div className="sideBar-top-container">
                <div className="sideBar-top-left">
                    <div className="sideBar-open-icon ref" onClick={toggle}>
                        <i className="fa-solid fa-bars ref"></i>
                    </div>
                    <NavLink className="home-l-t" to="/home">
                        <img src={logo} alt="asanc logo" className="home-logo" style={{ backgroundColor: "rgb(37, 38, 40)" }} />
                        <span className="home-title">Asanc</span>
                    </NavLink>
                </div>
                <div className="currentUser-profile">
                    <CurrentUserInfo currentUser={currentUser} />
                </div>


            </div>

            <>
                <div className={`${sidebarClass} ref`}>

                    <div className="sideBar-Midddle">
                        <NavLink className="sideBar-home" to="/home">
                            <span className="home-icon">
                                <i className="fa-solid fa-house"></i>
                            </span>
                            <span>Home</span>
                        </NavLink>
                        <NavLink className="sideBar-mytask" to="/tasks">
                            <span className="my-task-icon">
                                <i className="fa-regular fa-circle-check"></i>
                            </span>
                            <span className="my-task">
                                My Tasks
                            </span>
                        </NavLink>
                        <div className="create-project">
                            <div className='p-c-title' >
                                Projects
                            </div>
                            <div id="add-project-button" >
                                <ProjectCreateModal location="sideBar" />
                            </div>

                        </div>
                        <div className="sideBar-user-project">
                            <div className="c-project-list">
                                {projectsArr?.map((project) => {
                                    return (

                                            <NavLink className="sideBar-myproject" to={`/home/${project?.id}/list`} key={project?.id}>
                                                {/* <i className="fa-solid fa-square" style={{backgroundColor: project?.color}} id="p-c-sideBar"></i> */}
                                                <div style={{ backgroundColor: project?.color }} className="p-c-sideBar">

                                                </div>
                                                <span className="p-title-sideBar">
                                                    {project.title}
                                                </span>
                                            </NavLink>


                                    )

                                })}
                            </div>
                        </div>

                    </div>
                    <div className="sideBar-button">
                        <LogoutButton />
                    </div>

                    <div className="about-links">
                        <div style={{ textAlign: "center" }} className="about-title">Created by Cici Cheng</div>
                        <NavLink className="github-link"
                            to={{
                                pathname: "https://github.com/cici1819",
                            }}
                            target="_blank"
                        >
                            <div className="logo-gitHub">
                                <BsGithub size="2em" />
                            </div>
                        </NavLink>
                        <NavLink
                            to={{
                                pathname: "https://www.linkedin.com/in/cici-cheng-87386a259/",
                            }}
                            target="_blank"
                        >
                            <div className="linkedin-link2">
                                <BsLinkedin size="2em" />
                            </div>
                        </NavLink>
                    </div>
                </div>

            </>

        </>

    )



}


export default SideBar
