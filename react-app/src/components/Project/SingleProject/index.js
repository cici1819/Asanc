import React from "react";
import { NavLink } from "react-router-dom"

import './SingleProject.css';


function SingleProject({ project }) {

    if (!project) { return null }


     console.log("project!!!!!!!!!!!!!!!!!", project)

    if (project.hasOwnProperty('sections') && project.sections.length > 0) {
        return (
            <NavLink
                to={`/home/${project?.id}`/list}>
                <img className={`single-project-icon`} src={project?.icon} alt='single-project-icon' />
            </NavLink>
        )
    } else {
        firstSectionId = 0
        return (
            <>

                <NavLink
                    to={`/sections/${project?.id}/${firstSectionId}`}>
                    <img className={`single-project-logo`} src={project?.icon} alt='single-priject-logo' />
                </NavLink>
            </>
        )
    }

}



export default SingleProject;
