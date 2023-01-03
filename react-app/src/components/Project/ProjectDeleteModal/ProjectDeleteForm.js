import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router";
import { deleteOneProject, getCurrUserProjects, getOneProject} from "../../../store/projectReducer";
import './ProjectDelete.css';


function ProjectDelete({ setShowProjectDeleteModal, currentProject }) {
    const dispatch = useDispatch();
    const history = useHistory() ;
    const [showError, setShowError] = useState('')
    const [projectTitle, setProjectTitle] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState("");
    const { projectId } = useParams();
    // const currentProject = useSelector(state => state.projects.singleProject)

    // useEffect(() => {
    //     dispatch(getOneProject(projectId))
    // }, [dispatch, projectId]);

    useEffect(() => {
        if (currentProject?.title !== projectTitle) {
            setShowError('Please provide the correct project title')
        } else {
            setShowError('')
        }

    }, [projectTitle])


    const handleDelete = async (e) => {
        setHasSubmitted(true);

        if (currentProject?.title !== projectTitle) {
            return;
        }
        await dispatch(deleteOneProject(projectId))

        await dispatch(getCurrUserProjects())

        await setShowProjectDeleteModal(false);

        await history.push("/home")

    }


    return (
        <>
            <div className="delete-Project-wapper2">
                <form className='delete-Project-form' onSubmit={handleDelete}>
                    <div className="p-delete-text">
                        <div className="p-delete-title">
                            <h2>Delete {currentProject?.title}</h2>
                        </div>
                        <div className="p-delete-warning">
                            <span className="d-p-1">Are you sure you want to delete </span>
                            <span className="d-p-2">{currentProject?.title}?</span>
                            <span className="d-p-3">
                                This cannot be undone.
                            </span>
                        </div>
                    </div>

                    <div className="d-p-errors-list">
                        {hasSubmitted && !!showError.length && (
                            <ul className='error-list-d-p'>
                                <li id='errors' >{showError}</li>
                            </ul>

                        )}
                    </div>
                    <div className="d-p-input">
                        <span className='delete-project-check'>Enter Project Title</span>
                        <input className="delete-input"

                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}

                        />
                    </div>


                </form>


                <div className="delete-project-button">
                    <button className="d-b-p"
                        onClick={(e) => handleDelete(projectId)}>Delete Project
                    </button>
                </div>

                <div className="p-c-cancel" onClick={() => setShowProjectDeleteModal(false)}>
                    Cancel
                </div>

            </div>
        </>
    )
}




export default ProjectDelete;
