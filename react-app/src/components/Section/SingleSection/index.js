import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatedSection } from "../../../store/sectionReducer"
import { getOneProject } from "../../../store/projectReducer"
import SectionDeleteModal from "../SectionDeleteModal";
import TaskInSection from "../../Task/TaskInSection";
import TaskCreate from '../../Task/TaskCreate';
import "./SingleSection.css"
const SingleSection = ({ show, title, sessionUserIsOwner, section, project, sessionUser }) => {
    const dispatch = useDispatch();
    const [sectionTitle, setSectionTitle] = useState(title);
    const [timer, setTimer] = useState(null)
    const [errors, setErrors] = useState([]);
    const sectionId = section.id
    const projectId = project.id
    const [showMenu, setShowMenu] = useState(false)
    const [showSectionDeleteModal, setShowSectionDeleteModal] = useState(false);
    const [showNewTask, setShowNewTask] = useState(false)
    const settingClass = show ? "section-setting-dropMenu delete-ele" : "section-setting-dropMenu-closed delete-ele"
    const [style, changeStyle] = useState("setting-add-task")
    // const addTaskRef = useRef(null)
    const creatTaskClass = show ? "show-create-task" : "closed-create-task"
    const taskCreateRef = useRef();
    const [inputStyle, changeInputStyle] = useState("edit-section-input")
    const ref = useRef(null)

    const openMenu = () => {

        if (showMenu) return;
        else {
            setShowMenu(true);
            // if (style === "setting-add-task") {
            //     changeStyle("setting-add-task2")
            // } else if (style === "setting-add-task2") {
            //     changeStyle("setting-add-task")
            // }
            changeStyle("setting-add-task2")
            changeInputStyle("edit-section-input2")

        }
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {

            if (e.target.className && e.target.className.includes !== "undefined" && (e.target?.className?.includes('delete-ele'))) return;
            setShowMenu(false);
            changeStyle("setting-add-task")
            changeInputStyle("edit-section-input")
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);



    useEffect(() => {
        const errors = [];
        if (sectionTitle.length > 30) {
            errors.push("title should be less than 30 characters")
        }
        setErrors(errors);
    }, [sectionTitle])

    const handleInputBlur = async (e) => {
        e.preventDefault();
        // console.log(`current input value...... ${e.target.value}`);
        let title = e.target.value;
        if (title === "") {
            title = "Untitled Section";
            setSectionTitle(title);
        }

        const payload = {
            sectionId: sectionId, title: title, projectId: projectId
        };
        const editedSection = dispatch(updatedSection(payload))
        if (editedSection) {
            await dispatch(getOneProject(projectId))
        }

    }




    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.target.blur();

        }
    }


    const handleChange = (e) => {
        e.preventDefault();
        setSectionTitle(e.target.value);

    }

    const handleEdit = () => {
        ref.current.focus();
    }


    // const handelAddOneTask = () => {

    //     console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ onClick")

    //     //
    //     return (<>
    //         <div>
    //          {sessionUserIsOwner && <TaskCreate project={project} section={section} sessionUser={sessionUser} />}
    //         </div>
    //     </>)


    // }
    // const [taskList, setTaskList] = useState([]);
    // const onAddBtnClick = event => {

    //     setTaskList(taskList.concat(
    //         <div>
    //             <TaskCreate project={project} section={section} sessionUser={sessionUser} />
    //         </div>)

    //     );

    //////////////////////////////////////////////////
    const handleClickTask = e => {
        // console.log("#####################,TaskDetail e", e)
        // if (target.className && typeof target.className.includes !== 'undefined' &&(target.className.includes('kpxc') || target.className.includes('ui-helper')))
        if (taskCreateRef?.current?.contains(e.target)) {
            return;
        } else if (e.path[0].className && e.path[0].className.includes !== 'undefined' && (e.path[0].className.includes("css"))) {
            return;
        } else if (e.path[1].className && e.path[1].className.includes !== 'undefined' && (e.path[1].className.includes("css"))) {
            return;
        } else {
            setShowNewTask(false)
        }

    }

    useEffect(() => {

        if (showNewTask) {
            document.addEventListener("click", handleClickTask);
            return () => {
                document.removeEventListener("click", handleClickTask);
            };
        }
    }, [showNewTask]);







    ////////////////////////////////////////////////////////


    // };
    const onAddBtnClick = (e) => {
        setShowNewTask(true);
        // addSectionRef.current.focus()

        // setCreateNewTask(true)
    }


    return (
        <>


            {errors.length > 0 && (<div className='section-error-list'>

                {errors[0]}

            </div>)}

            {/* {taskList} */}




            {sessionUserIsOwner ?
                (<>
                    <div className='section-part-input'>
                        <input id={inputStyle}
                            type='text'
                            value={sectionTitle}
                            placeholder="Untitled Section"
                            onBlur={handleInputBlur}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            ref={ref}

                        />

                        <div className={style} id="grabable">
                            <div className='add-task-in-section-icon' onClick={onAddBtnClick}  >
                                <i className="fa-regular fa-plus" ></i>
                                <span id='c-info-title'>Add a task in this section</span>
                            </div>
                            <div className="open-section-setting" onClick={openMenu}>
                                <i className="fa-solid fa-ellipsis delete-ele"></i>
                                <span id='s-info-title'>Section setting</span>
                            </div>
                        </div>
                        {/* <div className={style} id="grabable">
                        <div className="open-section-setting" onClick={openMenu}>
                                <i className="fa-solid fa-ellipsis delete-ele"></i>
                                <span id='s-info-title'>Section setting</span>
                            </div>
                            <div className='add-task-in-section-icon' onClick={onAddBtnClick}  >
                                <i className="fa-regular fa-plus" ></i>
                                <span id='c-info-title'>Add a task in this section</span>
                            </div>

                        </div> */}


                    </div>


                    {showMenu && (
                        <>
                            <div className={settingClass}>
                                <div className='section-edit-div delete-ele'
                                    onClick={handleEdit}>
                                    <span className='s-e-t delete-ele'>
                                        Rename section
                                    </span>
                                    <span className='s-e-icon delete-ele'>
                                        <i className="fa-solid fa-pencil delete-ele"></i>
                                    </span>

                                </div>


                                <div className='section-delete-div delete-ele'
                                    onClick={() => {

                                        // console.log("showServerEditModal clickruning!!!!!!!!!!!")

                                        setShowSectionDeleteModal(true)

                                    }}>
                                    <span className='delete-section-title delete-ele'>
                                        Delete section
                                    </span >
                                    <span className='delete-section-icon delete-ele'>
                                        <i className="fa-solid fa-trash-can delete-ele"></i>
                                    </span>

                                </div>

                                <div className='delete-ele delete-modal'>
                                    {<SectionDeleteModal section={section} showSectionDeleteModal={showSectionDeleteModal} setShowSectionDeleteModal={setShowSectionDeleteModal} project={project} />}
                                </div>

                            </div>

                        </>

                    )}

                </>


                )
                : (
                    <>
                        <div className='read-section-input'>
                            <input
                                type='text'
                                value={sectionTitle}
                                onChange={(e) => handleChange(e)}
                                readOnly
                            />
                            <div className='setting-add-task'>
                                <div className='add-task-in-section-icon' onClick={onAddBtnClick}>
                                    <i className="fa-regular fa-plus"></i>
                                    <span id='c-info-title'>Add a task in this section</span>
                                </div>
                            </div>

                        </div>


                    </>


                )}
            <div ref={taskCreateRef} className={creatTaskClass}>
                {showNewTask && <TaskCreate show={show} project={project} section={section} sessionUser={sessionUser} setShowNewTask={setShowNewTask} showNewTask={showNewTask} />}
            </div>

            <div className='tasks-in-section'>
                <TaskInSection show={show} section={section} project={project} sessionUser={sessionUser} sessionUserIsOwner={sessionUserIsOwner}  />
            </div>



        </>
    )
}

export default SingleSection
