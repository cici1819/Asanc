
import React from "react";
import { useState, useEffect, useRef } from 'react';
import './TaskInSection.css'
import SingleTask from "../TaskDetail";
import TaskCreate from '../../Task/TaskCreate';
import tasks from "../../../store/taskReducer";

function TaskInSection({ section, project, sessionUser }) {
    console.log("*****************,section", section)
    const [showNewTask, setShowNewTask] = useState(false)
    // const [createNewTask, setCreateNewTask] = useState(false);

    // const [currentTaskId, setCurrentTaskId] = useState(-1);
     const users = project?.users
    // let tasksArr = section?.tasks
    // if (currentTaskId !== -1) {
    //     tasksArr = tasksArr.filter(t => t.id !== currentTaskId)

    // }
    const projectId = project?.id
    let tasksArr = section?.tasks

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

    const onAddBtnClick = (e) => {
        setShowNewTask(true);
        // setCreateNewTask(true)
    }


    if (!section) return null
    return (
        <>
            {/* {sessionUserIsOwner && <div className='add-task-in-section-icon' onClick={onAddBtnClick}>
                <i className="fa-duotone fa-plus"></i>
            </div>} */}
            <div className='add-task-in-section-icon' onClick={onAddBtnClick}>
                <i className="fa-duotone fa-plus"></i>
            </div>
            <div>
                {showNewTask && <TaskCreate  project={project} section={section} sessionUser={sessionUser} setShowNewTask={setShowNewTask} showNewTask={showNewTask} />}
            </div>
            {tasksArr.length > 0 && tasksArr?.map((task) => (
                <div key={task.id}>
                    <SingleTask task={task} users={users} section={section} sessionUser={sessionUser} projectId={projectId} />
                </div>
            ))}


        </>

    )

}

export default TaskInSection
