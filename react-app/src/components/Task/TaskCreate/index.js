import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSection } from "../../../store/sectionReducer"
import TaskSideDetail from '../TaskSideDetail';
import { getOneProject } from "../../../store/projectReducer"
import * as taskAction from "../../../store/taskReducer"
import Select from 'react-select';
import { components } from 'react-select';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import userLogo from "../../../img/user-logo.png"
import './TaskCreate.css'


const TaskCreate = ({ section, sessionUser, project }) => {
    const [saveState, setSaveState] = useState("");
    const didMount = useRef(false);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assigneeId, setAssingeeId] = useState('');
    const dateDiv = useRef();
    const [properDate, setProperDate] = useState();
    let newTask = useSelector(state => state.tasks.singleTask)
    // console.log("+++++++++++++,newTask", newTask)
    const [showDateForm, setShowDateForm] = useState(false);
    const [completed, setCompleted] = useState(false)
    const [dueDate, setDueDate] = useState('');
    // const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [priority, setPriority] = useState('');
    const [showTaskSideDetail, setShowTaskSideDetail] = useState(false);

    const [errors, setErrors] = useState([]);
    const sectionId = section.id
    const ownerId = sessionUser.id
    const projectId = project.id
    const users = project?.users


    // assignee select///////////////////////////////////////////////////
    let options = [];
    for (let i = 0; i < users.length; i++) {
        let assigneeObj = users[i];
        let value = assigneeObj.id;
        let label = `${assigneeObj.firstName} ` + assigneeObj.lastName
        let color = assigneeObj.avatar_color
        options.push({ value: value, label: label, color: color, img: userLogo })
    }

    const defaultValueObj = { value: sessionUser.id, label: `${sessionUser.firstName}  ` + sessionUser.lastName, color: sessionUser.avatar_color, img: userLogo }


    const { SingleValue, Option } = components;
    const IconSingleValue = (props) => (
        <SingleValue {...props}>
            {props.data.label}
            <img src={props.data.img} style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: props.data.color }} />

        </SingleValue>
    );

    const IconOption = (props) => (
        <Option {...props}>
            {props.data.label}
            <img src={props.data.img} style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: props.data.color }} />

        </Option>
    );

    const customStyles = {
        option: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-around",
            width: "150px"
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: "150px",
            justifyContent: "space-around"
        }),
    }


    /////////////////////////////////////////////////////handle change





    const handleTitleChange = (e) => {
        // e.preventDefault();
        setTaskTitle(e.target.value)
    }

    // const handleTitleBlur = (e) => {
    //     e.preventDefault()
    //     let taskTitle = e.target.value;
    //     const payload = {
    //         title: taskTitle,
    //         description,
    //         assigneeId: sessionUser.id,
    //         ownerId,
    //         sectionId,
    //         status: status,
    //         priority: priority,
    //         projectId,
    //         end_date: new Date().toISOString().split('T')[0],
    //         completed
    //     };
    //    newTask= dispatch(taskAction.thunkCreateTask(payload));
    //     setErrors([])
    // }



    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);

    };

    const handleAssigneeChange = (e) => {
        setAssingeeId(e.value)
        // const payload = {
        //             title: taskTitle,
        //             description,
        //             assigneeId: assigneeId,
        //             ownerId,
        //             sectionId,
        //             status: status,
        //             priority: priority,
        //             projectId,
        //             end_date: new Date().toISOString().split('T')[0],
        //             completed
        // };
        // newTask = dispatch(taskAction.thunkCreateTask(payload));
        // if (newTask) {
        //     taskId = newTask.id
        //     dispatch(getOneSection(sectionId))
        //     dispatch(taskAction.loadOneTask(taskId))
        // }
        // setErrors([])

    }

    const handleDueDateChange = (date) => {
        const dateStr = JSON.stringify(date).slice(1, 11);
        setDueDate(dateStr);

    }

    ////////////////////////////////////////////////////////////////////
    // canlendar

    const tileDisabled = ({ activeaStartDte, date, view }) => {
        const currentDate = new Date();
        const adjustedDate = new Date();
        let avaliable = adjustedDate.setDate(currentDate.getDate() - 1);
        return date < avaliable
    }



    useEffect(() => {
        if (showDateForm) {
            document.addEventListener("mousedown", handleClickDate);
            return () => {
                document.removeEventListener("mousedown", handleClickDate);
            };
        }
    }, [showDateForm]);

    const handleClickDate = (e) => {
        if (dateDiv.current.contains(e.target)) {
            return;
        }
        setShowDateForm(false)
        return;
    };
    //////////////////////////////////////////////////////////////////////////////

    let taskId
    let task
    useEffect(() => {


        const delayDispatch = setTimeout(async () => {
            if (didMount.current) {
                const payload = {
                    title: taskTitle,
                    description,
                    assigneeId: assigneeId,
                    ownerId,
                    sectionId,
                    status: status,
                    priority: priority,
                    projectId,
                    end_date: dueDate,
                    completed
                };

                newTask = await dispatch(taskAction.thunkCreateTask(payload));
                console.log("task+++++++++++++++", task)
                if (newTask) {
                    taskId = task.id
                    // console.log("88888888888",taskId)
                    task = dispatch(taskAction.thunkGetOneTask(taskId))
                    // console.log("^^^^^^^^^^^^^^^^newTask",newTask)
                    //    await dispatch(getOneProject(projectId))
                }
                setSaveState("save changes");
                setTimeout(() => {
                    setSaveState("");
                }, 2000);

            } else {
                didMount.current = true;
                return null
            }

        }, 3000)
        return () => clearTimeout(delayDispatch);

    }, [taskTitle, description, assigneeId, priority, status, taskId, dueDate, task]);

    useEffect(() => {
        dispatch(taskAction.thunkGetOneTask(taskId))
        dispatch(getOneProject(projectId))
        //  console.log("dispatch+++++++++++++++++",)
    }, [dispatch, taskId])

    useEffect(async () => {
        if (task) {
            didMount.current = false;
            // await dispatch(taskAction.loadOneTask(taskId))
            // await dispatch(getOneProject(projectId))
            setTaskTitle(task?.title);
            setDescription(task?.description);
            if (task?.assigneeId) {
                setAssingeeId(task?.assigneeId);
            } else {
                setAssingeeId(task?.ownerId);
            }
            if (task?.end_date) {
                setDueDate(task?.end_date);
                let newDueDate = new Date(task?.end_date);
                const date = newDueDate.getDate() + 1
                const newDate = newDueDate.setDate(date)
                const adjustedNewDate = new Date(newDate)
                setProperDate(adjustedNewDate);

            } else {
                setDueDate(null);
                setProperDate(new Date());

            }
            if (task.priority) {
                setPriority(task?.priority);
            } else {
                setPriority("---");
            }
            if (task.status) {
                setStatus(task?.status);
            } else {
                setStatus("---");
            }
        }


    }, [task])

    ////////////////////////////////////////////////////////////////////////////////////////////

    const toggleCompleted = async (e) => {
        // e.stopPropagation();
        e.preventDefault();

        const res = await dispatch(taskAction.toggleCompleteTask(taskId));
        if (res) {
            await dispatch(getOneProject(projectId))

        }

    };



    const deleteTask = async () => {
        console.log("%%%%%%%%%%%", taskId)
        await dispatch(taskAction.thunkDeleteTask(taskId));
        await dispatch(getOneProject(projectId))
    };


    ////////////////////////////////////////////////////////////////////////////////////
    // let taskSettingUser = false
    // if (task) {
    //     if (sessionUser.id == task.ownerId || sessionUser.id == task.assigneeId) {
    //         taskSettingUser = true
    //     }

    // }



    useEffect(() => {
        const errors = [];
        if (taskTitle?.length > 50 || taskTitle?.length < 3) {
            errors.push("Title should between 3 and 50 characters")
        } else if (description?.length > 255) {
            errors.push("Description should be less than 255 characters")
        } else if (!assigneeId) {
            errors.push("Please provided a valid assignee")
        }

        setErrors(errors);
    }, [taskTitle, description, assigneeId])




    // const handleDescriptionBlur = (e) => {





    return (
        <>


            {task &&
                <>
                    <div onClick={() => {
                        setShowTaskSideDetail(true);

                    }}>

                        <span>Details</span>
                        <span>
                            <i className="fa-solid fa-chevron-right"></i>
                        </span>
                    </div>
                    <div>
                        <TaskSideDetail setShowTaskSideDetail={setShowTaskSideDetail} taskId={taskId} users={users} section={section} sessionUser={sessionUser} project={project} showTaskSideDetail={showTaskSideDetail} task={task} />
                    </div>
                </>
            }

            <div className='task-detail-content'>
                <div className="task-complete">
                    <button
                        onClick={toggleCompleted}
                        className={
                            task?.completed
                                ? "task-complete-button-completed"
                                : "task-complete-button"
                        }>

                        <i className="fa-solid fa-circle-check">

                        </i>
                        {task?.completed ? "Completed" : "Mark Complete"}
                    </button>{'  '}
                </div>
                {errors.length > 0 && (<div>

                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>

                </div>)}
                <div>
                    <input className='edit-task-title'
                        type='text'
                        value={taskTitle}
                        placeholder="New Task"
                        onChange={handleTitleChange}
                    // onBlur={handleTitleBlur}

                    />
                </div>




                <div>
                    <Select className='assignee-select'

                        styles={customStyles}
                        components={{ SingleValue: IconSingleValue, Option: IconOption }}
                        options={options}
                        defaultValue={defaultValueObj}
                        onChange={handleAssigneeChange}
                    // isSearchable={false}
                    />
                </div>


                <div className='date-setting'>
                    <span className='dueDate-title'>Due date</span>
                    {showDateForm ? (
                        <div
                            className="task-detail-date-open"
                            ref={dateDiv}
                            onClick={() => setShowDateForm(true)}>

                            <div className="task-calendar-icon">
                                <i className="fa-light fa-calendar-day"></i>
                            </div>
                            {dueDate ? dueDate : "No due date"}
                            <div id="task-detail-date-calendar">
                                <Calendar
                                    value={properDate}
                                    tileDisabled={tileDisabled}
                                    onChange={(date) => {
                                        setProperDate(date);
                                        // setServerDate(date.toString());
                                        handleDueDateChange(date)
                                    }}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className="task-detail-date"

                            onClick={() => setShowDateForm(true)}
                        >
                            <div id="task-date-icon">
                                <i className="fa-regular fa-calendar-days"></i>
                            </div>
                            {dueDate ? (
                                <div>
                                    {dueDate}

                                </div>
                            ) : (
                                "No due date"
                            )}
                        </div>
                    )}
                </div>

                <div className="task-detail-priority">
                    <div className="p-title">Priority</div>
                    <div className="p-content">
                        <select value={priority} onChange={handlePriorityChange}>
                            <option className="p-1" value="Null">---</option>
                            <option className="p-2" value="Low">Low</option>
                            <option className="p-3" value="Medium">Medium</option>
                            <option className="p-4" value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className="task-detail-status">
                    <div className="s-title">Status</div>
                    <div className="s-labels">
                        <select value={status} onChange={handleStatusChange}>
                            <option className="s-1" value="Null">---</option>
                            <option className="s-2" value="On Track">On Track</option>
                            <option className="s-3" value="At Risk">At Risk</option>
                            <option className="s-4" value="Off Track">Off Track</option>
                        </select>
                    </div>
                </div>
                <div className="task-delete"
                    onClick={deleteTask}>

                    <i className="fa-sharp fa-solid fa-circle-xmark"></i>

                </div>
            </div>


        </>
    )

}

export default TaskCreate
