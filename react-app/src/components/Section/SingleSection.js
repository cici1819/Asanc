import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatedSection } from "../../store/sectionReducer"
import SectionDeleteModal from "../Section/SectionDeleteModal";
const SectionSetting = ({ title, sessionUserIsOwner, section, project }) => {
    const dispatch = useDispatch();
    const [sectionTitle, setSectionTitle] = useState(title);
    const [timer, setTimer] = useState(null)
    const [errors, setErrors] = useState([]);
    const sectionId = section.id
    const projectId = project.id
    const [showMenu, setShowMenu] = useState(false)
    const [showSectionDeleteModal, setShowSectionDeleteModal] = useState(false);


    const openMenu = () => {
        if (showMenu) return;
        else setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (e.target.className.includes('delete-ele')) return;
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    useEffect(() => {
        const errors = [];
        if (sectionTitle.length > 50) {
            errors.push("title should be less than 50 characters")
        }
        setErrors(errors);
    }, [sectionTitle])

    const handleInputBlur = (e) => {
        e.preventDefault();
        // console.log(`current input value...... ${e.target.value}`);
        let title = e.target.value;
        if (title === "") {
            title = "Untitled Section";
            setSectionTitle(title);
        }
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            const payload = {
                sectionId: sectionId, title: title, projectId: projectId
            };
            dispatch(updatedSection(payload))
            // if (editedSection) {
            //      dispatch()
            // }
        }, 500)

        setTimer(newTimer)


    }

    const handleChange = (e) => {
        e.preventDefault();
        setSectionTitle(e.target.value);

    }


    return (
        <>
            {errors.length > 0 && (<div>

                {errors[0]}

            </div>)}
            {sessionUserIsOwner ?
                (<>
                    <input className='edit-section-input'
                        type='text'
                        value={sectionTitle}
                        placeholder="Untitled Project"
                        onBlur={handleInputBlur}
                        onChange={handleChange}

                    />
                    <span className='add-task-in-section-icon'>
                        <i className="fa-duotone fa-plus"></i>
                    </span>
                    <div className='open-section-setting' onClick={openMenu}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    {showMenu && (
                        <>
                            <div className='section-setting-dropMenu delete-ele'>
                                <div className='server-edit-div delete-ele'
                                    onClick={() => {

                                        // console.log("loginon click running````````````")
                                        // setShowServerEditModal(true)
                                    }
                                    }>

                                    <span className='s-e-icon delete-ele'>
                                        <i className="fa-solid fa-pencil delete-ele"></i>
                                    </span>
                                    <span className='s-e-t delete-ele'>
                                        Rename section
                                    </span>

                                </div>


                                <div className='section-delete-div delete-ele'
                                    onClick={() => {

                                        // console.log("showServerEditModal clickruning!!!!!!!!!!!")

                                        setShowSectionDeleteModal(true)

                                    }}>

                                    <span className='delete-section-icon delete-ele'>
                                        <i className="fa-solid fa-trash-can delete-ele"></i>
                                    </span>
                                    <span className='delete-section-title delete-ele'>
                                        Delete section
                                    </span >
                                </div>

                                <div className='delete-ele delete-modal'>
                                    {<SectionDeleteModal section={section} showSectionDeleteModal={showSectionDeleteModal} setShowSectionDeleteModal={setShowSectionDeleteModal} sessionUserIsOwner={sessionUserIsOwner} project={project} />}
                                </div>






                            </div>



                        </>

                    )}
                </>

                )
                : (
                    <input className='read-section-input'
                        type='text'
                        value={sectionTitle}
                        onChange={(e) => handleChange(e)}
                        readOnly
                    />


                )}


        </>
    )
}

export default SectionSetting
