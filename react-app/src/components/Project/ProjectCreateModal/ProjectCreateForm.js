import React, { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
// import { useParams } from "react-router";
import { createOneProject } from "../../../store/projectReducer";
import './ProjectCreate.css';



function ProjectCreate({ setShowModal }) {
    const dispatch = useDispatch();
    const [icon, setIcon] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [errors, setErrors] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const errors = [];
        if (
            !icon.toLowerCase().endsWith('.jpg')
            && !icon.toLowerCase().endsWith('.png')
            && !icon.toLowerCase().endsWith('.jpeg')
            && !icon.toLowerCase().endsWith('.gif')

        ) {
            errors.push(' Image URL should end with .jpg, .png, .jpeg .gif,!')
        }

        if (!icon.toLowerCase().startsWith('https://')
            && !icon.toLowerCase().startsWith('http://')) {
                errors.push('Image URL should start with https://, http://')
        }
        if (title.length > 30) {
            errors.push("title should be less than 30 characters")
        }
        if (title.length < 3) {
            errors.push("title should be more than 2 characters")
        }
        if (description.length < 5) {
            errors.push("description should be more than 5 characters")
        }
        if (description.length > 255) {
            errors.push("description should be less than 255 characters")
        }
        setValidationErrors(errors);
    }, [icon, title, description])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) {
            // console.log("ERRORS FOUND :", validationErrors)
            return
        } else {
            const projectPayload = { title, icon, description }
            // console.log("projectPayload", title, icon, description)
            // console.log("!!!!!frontend", projectPayload)
            let createdProject = await dispatch(createOneProject(projectPayload)).catch(async (res) => {

                const data = await res.json();
                // console.log("THIS IS RES :",res)
                if (data) {
                    setErrors(data)
                };
            });
            console.log("createdProject+++++++", createdProject)
            if (createdProject) {
                setValidationErrors([]);
                setErrors([]);
                await setShowModal(false);
                await history.push(`/home/${createdProject.id}/list`)
            }
        }

    }


    return (
        <>

            <div className="creat-project-container">
                <form className="creat-project-form" onSubmit={handleSubmit}>

                    <div className="creat-project-content">
                        <div className="creat-project-title">
                            <div className="c-p-text-top">
                                <h1>
                                    Create a new project
                                </h1>
                                <div className="mark-logo2">
                                    <img className='close-x-img2' src='https://static.thenounproject.com/png/1144486-200.png' alt='close' onClick={() => setShowModal(false)} />
                                </div>

                            </div>
                        </div>
                        <div>
                            {hasSubmitted && !!validationErrors.length && (
                                <div id='errors3-list'>
                                    <ul className='error4-list'>
                                        {validationErrors.map((error) => <li id='errors' key={error}>{error}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="creat-project-input">
                            <div className="p-input-title">
                                Project Title
                            </div>
                            <div className="s-c-input1">
                                <input
                                    id="c-p-input"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="s-input-title2">
                                Project Icon
                            </div>
                            <div className="s-c-input2">
                                <input
                                    id="c-p-input"
                                    type="text"

                                    value={icon}
                                    onChange={(e) => setIcon(e.target.value)}
                                />
                            </div>
                            <div className="s-input-title3">
                                Project Description
                            </div>
                            <div className="s-c-input3">
                                <input
                                    id="c-p-input"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}

                                />
                            </div>

                        </div>

                    </div>

                </form>

                <div className="create-project-button">
                    <button type="submit" className="c-p-b-homePage"onClick={handleSubmit}>Create Project</button>
                </div>



            </div>

        </>
    )
}




export default ProjectCreate;
