
import React from "react";
import { useState, useEffect, useRef } from 'react';
import './TaskInSection.css'
import SingleTask from "../TaskDetail";
import TaskCreate from '../../Task/TaskCreate';
import tasks from "../../../store/taskReducer";

function TaskInSection({ section, project, sessionUser, sessionUserIsOwner }) {
    console.log("*****************,section", section)

    const users = project?.users
    let tasksArr = section?.tasks
    const projectId = project?.id

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

    if (!section) return null
    return (
        <>
            {/* {sessionUserIsOwner && <div className='add-task-in-section-icon' onClick={onAddBtnClick}>
                <i className="fa-duotone fa-plus"></i>
            </div>} */}
            {tasksArr.length >0 && tasksArr?.map((task) => (
                <div key={task.id}>
                    <SingleTask task={task} users={users} section={section} sessionUser={sessionUser} projectId={projectId} />
                </div>
            ))}
          

        </>

    )

}

export default TaskInSection
