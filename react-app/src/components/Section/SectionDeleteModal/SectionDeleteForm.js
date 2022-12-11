import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router";
import { deleteSection } from "../../../store/sectionReducer";
import { getOneProject } from "../../../store/projectReducer";
import './SectionDeleteForm.css';


function SectionDelete({ setShowSectionDeleteModal, section, sessionUserIsOwner, project }) {
    const dispatch = useDispatch();
    

    console.log(section.title, "#########################")
    console.log(section.id, "!!!!!!!!!!!!!!!!!")
    const sectionId = section.id
    const projectId = project.id

    // useEffect(() => {
    //     const errors = [];
    //     if (section.title !== sectionTitle) {
    //         setShowError('Please provide the correct section title')
    //     } else {
    //         setShowError('')
    //     }

    // }, [sectionTitle])





    const handleDelete = async (e) => {
        e.preventDefault();


        await dispatch(deleteSection(sectionId));
        await dispatch(getOneProject(projectId))
        await setShowSectionDeleteModal(false);


    }
    const cancelDelete = async (e) => {
        e.preventDefault()
        await setShowSectionDeleteModal(false);
    }

    return (
        <>
            <div className="delete-server-wapper2">

                <div className="s-delete-text-1">
                    <div className="s-delete-title">
                        <h2>Delete {section?.title}</h2>
                    </div>
                    <div className="s-delete-warning">
                        <span className="d-s-1">Are you sure you want to delete </span>
                        <span className="s-d-s-2">{section?.title}?</span>
                        <span className="d-s-3">
                            This cannot be undone.
                        </span>
                    </div>
                </div>

                <div className="delete-section-button">
                    <button
                        onClick={handleDelete}>Delete Section
                    </button>
                </div>

                <div className="s-c-cancel" onClick={cancelDelete}>
                    Cancel
                </div>

            </div>
        </>
    )
}




export default SectionDelete;
