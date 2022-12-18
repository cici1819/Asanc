import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserProjects } from "../../../store/projectReducer"
import { NavLink, useHistory } from "react-router-dom"
import * as taskAction from "../../../store/taskReducer"
import SideBar from '../../SideBar/SideBar';
import "./CurrentUserTasks.css"


const CurrentUserTasks = ({ show, toggle }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const projects = useSelector(state => state.projects.allProjects)
    const projectsArr = Object.values(projects);
    const tasks = useSelector(state => state.tasks.allTasks)
    const tasksArr = Object.values(tasks)

    useEffect(() => {
        dispatch(getCurrUserProjects())
        dispatch(taskAction.thunkGetCurrUserTasks())
    }, [dispatch]);

    if (!tasks || !tasksArr.length) {
        return (<div>
            <SideBar show={show} toggle={toggle} />
            <div className="user-none-tasks" to="/home">
                <h3> Sorry , {sessionUser.firstName},you do not have any tasks at this time ,you can start with creating a new task! </h3>
            </div>
        </div>)

    }

    return (<>


        <div className="tasks-list">
            <div className="user-tasks-page-sideBar">
                <SideBar show={show} toggle={toggle} />
            </div>
            <div className="tasks-title">
                {sessionUser.firstName}'s Tasks
            </div>
            <div className="task-list">
                {projectsArr?.map((project) => {

                    return (

                        <div className="sigle-project-tasks-div" key={project?.id}>
                            {project?.title} - My Workspace ({project.tasks.length})
                            <div>
                                {project?.tasks.map((task) => {
                                    return (
                                        <ul className='sigle-task' key={task.id}>
                                            <li>
                                                Due date :
                                                {task.end_date}
                                            </li>
                                            <li>
                                                Priority:
                                                {task.priority}
                                            </li>
                                            <li>
                                                Status:
                                                {task.status}
                                            </li>

                                        </ul>
                                    )
                                })}
                            </div>




                        </div>

                    )

                })}
            </div>

        </div>





    </>)


}

export default CurrentUserTasks
