import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserProjects } from "../../../store/projectReducer";
import SingleProject from "../SingleProject";
import './CurrentUserProject.css';


function CurrentUserProject() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.projects.allProjects);
    const projectsArr = Object.values(projects);
    useEffect(() => {
        dispatch(getCurrUserProjects())
    }, [dispatch]);

    console.log('projects!!!!!!!!', projects)

    // const goToProject = (projectId) => {

    //     history.push(`/projects/${projectId}`)
    // }
    if (!projects || !projectsArr.length) {
        return (
        <div className="user-none-projects">
          <h3> Sorry , {sessionUser.firstName},you do not have any projects at this time ,you can start with creating a new project! </h3>
        </div>)
    }

    return (
        <>
            <div className="single-project-container">
                <div className="c-project-list">
                    {projects?.map((project) => {
                        <div key={project?.id}></div>
                        return (
                            <SingleProject project={project} key={project?.id} />
                        )

                    })}
                </div>
            </div>

        </>
    )
}




export default CurrentUserProject;
