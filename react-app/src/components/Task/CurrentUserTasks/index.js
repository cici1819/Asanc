import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrUserProjects } from "../../../store/projectReducer"
import { NavLink, useHistory } from "react-router-dom"
import * as taskAction from "../../../store/taskReducer"
import SideBar from '../../SideBar/SideBar';
import classNames from "classnames";
import "./CurrentUserTasks.css"


const CurrentUserTasks = ({ show, toggle }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user);
    const projects = useSelector(state => state.projects.allProjects)
    const projectsArr = Object.values(projects);
    const tasks = useSelector(state => state.tasks.allTasks)
    const tasksArr = Object.values(tasks)
    const taskListsClass = show ? "task-lists-currentUser" : "task-lists-currentUser-closed"
    const mainPageTableClass = show ? "task-table-title2" : "task-table-title-closed2"

    useEffect(() => {
        dispatch(getCurrUserProjects())
        dispatch(taskAction.thunkGetCurrUserTasks())
    }, [dispatch]);

    if (!tasks || !tasksArr.length) {
        return (<div>
            <SideBar show={show} toggle={toggle} />
            <NavLink className="user-none-tasks" to="/home">
                <h3> Sorry , {sessionUser.firstName},you do not have any tasks at this time ,you can start with creating a new task! </h3>
            </NavLink>
        </div>)

    }

    return (<>
        <div className="user-tasks-page-sideBar">
            <SideBar show={show} toggle={toggle} />
        </div>
        <div className="tasks-title">
            {sessionUser.firstName}'s Tasks
        </div>

        <div className={taskListsClass}>

            <div className="task-list">
                <div className={mainPageTableClass}>
                    <div className="t-t-name2">
                        Task name
                    </div>
                    <div className="t-t-dueDate2">
                        Due date
                    </div>
                    <div className="t-t-priority2">
                        Priority
                    </div>
                    <div className="t-t-status2">
                        Status
                    </div>

                </div>
                {projectsArr?.map((project) => {

                    return (

                        <div className="sigle-project-tasks-div" key={project?.id}>
                            <div className='title-project'>  {project?.title} - My Workspace ({project.tasks.length})</div>

                            <div className='projec-taskList'>
                                {project?.tasks.map((task) => {
                                    return (
                                        <div className='sigle-task' key={task.id}>
                                            <div className='task-title'>

                                                {task.title}
                                            </div>
                                            <div className="myTask-dueDate">

                                                {task.end_date}
                                            </div>
                                            <div id="myTask-p">
                                                <span id="p-s-myTask" className={`${task.priority === "Null" ? "p-1" : ""} ${task.priority === "Low" ? "p-2" : ""} ${task.priority === "Medium" ? "p-3" : ""} ${task.priority === "High" ? "p-4" : ""}`}>
                                                    {task.priority}
                                                </span>

                                            </div>
                                            <div id="myTask-s">
                                                <span id="p-s-myTask"className={`${task.status === "Null" ? "s-1" : ""} ${task.status === "On Track" ? "s-2" : ""} ${task.status === "At Risk" ? "s-3" : ""} ${task.status === "Off Track" ? "s-4" : ""}`} >
                                                    {task.status}
                                                </span>


                                            </div>

                                        </div>
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
