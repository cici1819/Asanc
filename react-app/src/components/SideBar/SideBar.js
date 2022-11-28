import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserProjects } from "../../store/projectReducer";
import LogoutButton from "../auth/LogoutButton";
import logo from "../../img/asanc-logo.jpg"
import userLogo from "../../img/user-logo.png"
import "./SideBar.css"
import ProjectCreateModal from "../Project/ProjectCreateModal";
import { NavLink, Link } from "react-router-dom";



const SideBar = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user)
    const sidebarClass = show ? "sidebar-open" : "sidebar-closed"
    const projects = useSelector(state => state.projects.allProjects);
    const projectsArr = Object.values(projects);
    useEffect(() => {
        dispatch(getCurrUserProjects())
    }, [dispatch]);

    if (!projects || !projectsArr.length) {
        return null
    }
    return (
        <div className={sidebarClass}>
            <div className="sideBar-top">
                <img src={logo} alt="asanc logo" className="home-logo" style={{ backgroundColor: rgb(37, 38, 40) }} />
                <span className="home-title">Asanc</span>
                <span className="sideBar-open-icon">
                    <i className="fa-light fa-bars"></i>
                </span>
            </div>
            <div className="sideBar-Midddle">
                <NavLink className="sideBar-home" to="/home" exact={true}>
                    <span className="home-icon">
                        <i class="fa-light fa-house-blank"></i>
                    </span>
                    <span>Home</span>
                </NavLink>
                <Link className="sideBar-mytask" to="/tasks" exact={true}>
                    <span className="my-task-icon">
                        <i className="fa-regular fa-circle-check"></i>
                    </span>
                    <span className="my-task">
                        My Tasks
                    </span>
                </Link>
                <div className="create-project">
                    <ProjectCreateModal />
                </div>
                <div className="sideBar-user-project">
                    <div className="c-project-list">
                        {projects?.map((project) => {
                            <div key={project?.id}></div>
                            return (
                                <Link className="sideBar-my
                            project" to={`/home/${project?.id}/list`}>
                                    <i className="fa-solid fa-square" ></i>
                                    <span>
                                        My Projects
                                    </span>
                                </Link>
                            )

                        })}
                    </div>
                </div>
                <div className="currentUser-profile">
                    <div>
                        <img src={userLogo} style={{ backgroundColor: user?.avatar_color }} />
                    </div>
                </div>
            </div>
        </div>
    )


}
