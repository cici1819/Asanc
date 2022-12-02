import React, { useEffect,useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserProjects } from "../../store/projectReducer";
import LogoutButton from "../auth/LogoutButton";
import logo from "../../img/asanc-logo.png"
import userLogo from "../../img/user-logo.png"
import "./SideBar.css"
import ProjectCreateModal from "../Project/ProjectCreateModal";
import { NavLink, Link } from "react-router-dom";
import CurrentUserInfo from "../Project/UsersInOneProject/CurrentUserProfile";



const SideBar = ({ show }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user)
    console.log("!!!!!!!!!!!!!!", currentUser)
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
        <>
            <div className="sideBar-top-container">
                <div className="sideBar-top-left">
                    <span className="sideBar-open-icon">
                        <i className="fa-solid fa-bars" onClick={show}></i>
                    </span>
                    <NavLink className="home-l-t" to="/home" exact={true}>
                        <img src={logo} alt="asanc logo" className="home-logo" style={{ backgroundColor: "rgb(37, 38, 40)" }} />
                        <span className="home-title">Asanc</span>
                    </NavLink>
                </div>
                <div className="currentUser-profile">
                       <CurrentUserInfo currentUser={currentUser}/>
                </div>


            </div>
            {show &&
                <>
                    <div className={sidebarClass}>

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
                                <div className='p-c-title' >
                                    My Projects
                                </div>
                                <ProjectCreateModal />
                            </div>
                            <div className="sideBar-user-project">
                                <div className="c-project-list">
                                    {projectsArr?.map((project) => {
                                        <div key={project?.id}></div>
                                        return (
                                            <Link className="sideBar-myproject" to={`/home/${project?.id}/list`}>
                                                <i className="fa-solid fa-square" ></i>
                                                <span>
                                                    {project.title}
                                                </span>
                                            </Link>
                                        )

                                    })}
                                </div>
                            </div>

                        </div>
                        <div className="sideBar-bottom">
                            <LogoutButton />
                        </div>
                    </div>
                </>
            }
        </>

    )



}


export default SideBar
