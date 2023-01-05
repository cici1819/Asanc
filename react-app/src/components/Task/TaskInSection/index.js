
import React from "react";
import { useState, useEffect, useRef } from 'react';
import './TaskInSection.css'
import SingleTask from "../TaskDetail";
import TaskCreate from '../../Task/TaskCreate';
// import tasks from "../../../store/taskReducer";

function TaskInSection({ section, project, sessionUser, showNewTask, setShowNewTask,show }) {
    console.log("*****************,section", section)

    // const [createNewTask, setCreateNewTask] = useState(false);

    const creatTaskClass = show ? "show-create-task" : "closed-create-task"
    const tasksInSectionClass = show ?"show-tasks-section2":"closed-tasks-section"

    // const [currentTaskId, setCurrentTaskId] = useState(-1);
    const users = project?.users
    let tasksArr = section?.tasks
    // if (currentTaskId !== -1) {
    //     tasksArr = tasksArr.filter(t => t.id !== currentTaskId)

    // }
    const projectId = project?.id
    const taskCreateRef = useRef();
    // let tasksArr = section?.tasks

    console.log("#################,tasksArr", tasksArr)

    // const [taskList, setTaskList] = useState([]);
    // const onAddBtnClick = event => {

    //     setTaskList(taskList.concat(
    //         <div>
    //         <TaskCreate project={project} section={section} sessionUser={sessionUser} />
    //         </div>)

    //     );


    // };
    //  tasksArr= tasksArr.push(taskList)

    ///////////////////////////////////////////////////////


    const handleClickTask = e => {
        console.log("#####################,TaskDetail e", e)
        if (taskCreateRef.current?.contains(e.target)) {
            return;
        } else if (e.path[0].className.includes("css")) {
            return;
        } else if (e.path[1].className.includes("css")) {
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





    /////////////////////////////////////////////////////


    if (!section.id) return null
    return (
        <>
            {/* {sessionUserIsOwner && <div className='add-task-in-section-icon' onClick={onAddBtnClick}>
                <i className="fa-duotone fa-plus"></i>
            </div>} */}
            <div ref={taskCreateRef} className={creatTaskClass}>
                {showNewTask && <TaskCreate show={show} project={project} section={section} sessionUser={sessionUser} setShowNewTask={setShowNewTask} showNewTask={showNewTask} />}
            </div>


            <div className={tasksInSectionClass}>
                {tasksArr.length > 0 && tasksArr?.map((task) => (
                    <div key={task.id} >
                        <SingleTask show={show} task={task} users={users} section={section} sessionUser={sessionUser} projectId={projectId} />
                    </div>
                ))}
            </div>


        </>

    )

}

export default TaskInSection
