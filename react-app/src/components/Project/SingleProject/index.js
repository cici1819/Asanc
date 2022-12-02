import React from "react";
import { NavLink ,useHistory } from "react-router-dom"

import './SingleProject.css';


function SingleProject({ project }) {
    const history = useHistory();
    if (!project) { return null }


    console.log("project!!!!!!!!!!!!!!!!!", project)

    if (project.hasOwnProperty('sections') && project.sections.length > 0) {
        return (
            <>
                <NavLink
                    to={`/home/${project?.id}/list`}>
                    <img className={`single-project-icon`} src={project?.icon} alt='single-project-icon' />
                </NavLink>
            </>

        )
    } else {
        // history.push('/home')
        return null
    }

}



export default SingleProject;
