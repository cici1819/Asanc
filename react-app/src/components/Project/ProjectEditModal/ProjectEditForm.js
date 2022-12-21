import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { editOneProject, getOneProject } from "../../../store/projectReducer";
import './ProjectEdit.css';


function ProjectEdit({ setShowProjectEditModal ,currentProject}) {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    // const history = useHistory();
    // const currentProject = useSelector(state => state.projects.singleProject)

    const [title, setTitle] = useState(currentProject?.title);
    const [icon, setIcon] = useState(currentProject?.icon);
    const [description, setDescription] = useState(currentProject?.description);
    const [hasSubmitted, setHasSubmitted] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    // const sessionUser = useSelector(state => state.session.user)
    // useEffect(() => {
    //     dispatch(getOneProject(projectId))
    // }, [dispatch,projectId]);

    useEffect(() => {
        const errors = [];
        if (!icon?.includes('.com') && !icon?.includes('.jpg') && !icon?.includes('.png') && !icon?.includes('.jpeg')) {
            errors.push('Please provide a valid image URL!')
        }
        if (title?.length > 50) {
            errors.push("Title should be less than 50 characters")
        }
        if (title?.length < 3) {
            errors.push("Title should be more than 2 characters")
        }
        if (description?.length < 5) {
            errors.push("description should be more than 5 characters")
        }
        if (description?.length > 255) {
            errors.push("description should be less than 255 characters")
        }
        setValidationErrors(errors);
    }, [icon, title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) { return }
        // console.log('serverId', serverId)

        const editedProjectPayload = { projectId, title, icon, description }
        editedProjectPayload.projectId = projectId
        // console.log("!!!!!editedServerPayload", editedServerPayload)
        await dispatch(editOneProject(editedProjectPayload))
        await setShowProjectEditModal(false);


    }


    return (
        <>

            <div className="project-edit-wapper">
                <form onSubmit={handleSubmit} className="project-edit-form">
                    <div className="p-e-form-title">
                        <h2>
                            Project Details
                        </h2>
                        {hasSubmitted && !!validationErrors.length && (<div className="p-e-errors">
                            <ul>
                                {validationErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>)}
                    </div>
                    <div className="e-mark-logo">
                        <img className='e-close-x-img' src='https://static.thenounproject.com/png/1144486-200.png' alt='close' onClick={() => setShowProjectEditModal(false)} />
                    </div>

                    <div className="project-title-input">
                        <div className="project-title">
                            Project Title
                        </div>
                        <input type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                        />
                    </div>
                    <div className="projecticon-input">
                        <div className="project-icon-title">
                        Project Icon
                        </div>
                        <input type="text"
                            value={icon}
                            onChange={(e) => setIcon(e.target.value)}

                        />
                    </div>
                    <div className="project-d-input">
                        <div className="project-d-title">
                        Project Description
                        </div>
                        <input type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>

                    <div className="edit-project-button">
                        <button type="submit">Save Changes</button>
                    </div>

                </form>

            </div>
        </>
    )
}




export default ProjectEdit;
