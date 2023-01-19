import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom"

import { getCurrUserProjects } from "../../../store/projectReducer";

import './CurrentUserProject.css';


function CurrentUserProject() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.projects.allProjects);
    const projectsArr = Object.values(projects);
    useEffect(() => {
        dispatch(getCurrUserProjects())
    }, [dispatch]);

    // console.log('projects!!!!!!!!', projects)


    if (!projects || !projectsArr.length) {
        return (
            <div className="user-none-projects">
                <h3> Sorry, {sessionUser.firstName},you do not have any projects at this time,you can start with creating a new project! </h3>
            </div>)
    }


    return (
        <>

            <div className="homePage-c-project-list">
                <div className="c-p-l-title">
                    Projects
                </div>
                <div className="icon-lists">
                    {projectsArr?.map((project) => {

                        return (

                            <div className="sigle-project-homepage-div" key={project?.id}>

                                <div onClick={()=>history.push(`/home/${project?.id}/list`)}>
                                    <div className="s-p-i-homePage">
                                        <img className={`single-project-icon`} src={project?.icon} style={{ backgroundColor: project?.color }} alt='single-project-icon' onError={e =>{e.currentTarget.src = "https://mingprojectawsbucket.s3.amazonaws.com/cici/ciciicon.png"}} />
                                    </div>
                                    <div className="single-project-title2">
                                        {project?.title}
                                    </div>

                                </div>
                            </div>

                        )

                    })}
                </div>

            </div>


        </>
    )
}




export default CurrentUserProject;
