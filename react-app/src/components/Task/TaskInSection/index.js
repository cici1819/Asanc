
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom"
import './TaskInSection.css'
import userLogo from "../../../img/user-logo.png"

function TaskInSection({ section, project }) {

    const usersArr = project?.users
    const tasksArr = section?.tasks
    if (!section) return null
    return (
        <>
            {tasksArr.map((task) => (
                <div key={task.id}>
                    <span>{task.title}</span>
                    <span>{task.description}</span>

                    <div>
                        <span className="assignee-firstName">
                            {usersArr.find(user => user?.id == task.assigneeId).firstName}
                        </span>
                        <span className="assignee-lastName">
                            {usersArr.find(user => user?.id == task.assigneeId).lastName}
                        </span>
                        <span className="assignee-logo">
                            <img src={userLogo} style={{ backgroundColor: (usersArr.find(user => user?.id == task.assigneeId).avatar_color) }} className="task-assignee-logo" />
                        </span>
                    </div>
                    <span> {task.end_date}</span>
                    <span>{task.priority}</span>
                    <span>{task.status}</span>
                </div>
            ))}
        </>

    )

}

export default TaskInSection
