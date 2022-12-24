import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSection } from "../../../store/sectionReducer"
// import TaskSideDetail from '../TaskSideDetail';
import { getOneProject } from "../../../store/projectReducer"
import * as taskAction from "../../../store/taskReducer"
import Select from 'react-select';
import { components } from 'react-select';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import userLogo from "../../../img/user-logo.png"
import './TaskCreate.css'
import TaskSideCreate from '../TaskSideCreate';
// import { use } from 'express/lib/router';


const TaskCreate = ({ section, sessionUser, project, setShowNewTask }) => {
    const [saveState, setSaveState] = useState("");
    const didMount = useRef(false);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [assignee, setAssignee] = useState({ value: sessionUser?.id, label: `${sessionUser?.firstName}  ` + sessionUser?.lastName, color: sessionUser?.avatar_color, img: userLogo });
    const [defaultValue, setDefaultValue] = useState({ value: sessionUser.id, label: `${sessionUser.firstName}  ` + sessionUser.lastName, color: sessionUser.avatar_color, img: userLogo })
    const dateDiv = useRef();
    const [properDate, setProperDate] = useState();
    //  const [task,setTask] = useState({})
    // let task = useSelector(state => state.tasks.singleTask)
    // console.log("+++++++++++++,newTask", task)
    const [newTask, setNewTask] = useState({});

    const [showDateForm, setShowDateForm] = useState(false);
    const [completed, setCompleted] = useState(false)
    const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
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
        //  e.preventDefault();
        setTaskTitle(e.target.value)
    }

    let taskId
    // let task
    const handleTitleBlur = async (e) => {
        e.preventDefault()
        let taskTitle = e.target.value;
        const payload = {
            title: taskTitle,
            description,
            assigneeId: sessionUser.id,
            ownerId,
            sectionId,
            status: status,
            priority: priority,
            projectId,
            completed,
            end_date: new Date().toISOString().split('T')[0],
        };

        await dispatch(taskAction.thunkCreateTask(payload)).then(
            res => {
                setNewTask(res)
                // setCurrentTaskId(res.id)
            }
        );

        taskId = newTask?.id
        // console.log("##################***********************,newTask res ", newTask)
        setErrors([])
         setShowNewTask(false)


    }





    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);

    };

    const handleAssigneeChange = async(e) => {
        const assinId = parseInt(e.value)
         await setAssigneeId(assinId)
         await setDefaultValue(e);
    }

    const handleDueDateChange = (date) => {
        const dateStr = JSON.stringify(date).slice(1, 11);
        setDueDate(dateStr);

    }




    const handleCanelCreat = async () => {
        // console.log("******************* handleCanelCreat", taskId)

        if (newTask) {
            taskId = newTask?.id
            await dispatch(taskAction.thunkDeleteTask(taskId))
                .then(setShowNewTask(false))

            setNewTask({})

            // console.log("newTask iN handleCanelCreat", newTask)
            // await dispatch(getOneProject(projectId))
        }

        else {
            setShowNewTask(false)
            setNewTask({})

        }
    }
    // useEffect(() => {
    //     if (!showTaskSideDetail) return;

    //     document.addEventListener('click', );

    //     return () => document.removeEventListener("click", closeDiv);
    // }, [showTaskSideDetail]);
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

     let task
    useEffect(() => {
        // taskId = newTask.

        if (!newTask?.id) return
        const delayDispatch = setTimeout(async () => {
            console.log(`############ update - task id**********`, newTask?.id);
            if (didMount.current) {
                const payload = {
                    title: newTask?.title,
                    description,
                    assigneeId: assigneeId,
                    taskId: newTask?.id,
                    ownerId,
                    sectionId,
                    status: status,
                    priority: priority,
                    projectId,
                    end_date: dueDate,
                    completed
                };

                await dispatch(taskAction.thunkUpdateTask(payload)).then(res => {
                    setNewTask(res)

                });

                task = newTask
                // setTask(updatedTask)

                // console.log("task+++++++++++++++", task)
                console.log("!!!!!!!!!!!!!!!!!! res ", newTask)

                // if (task) {
                //     taskId = task.id

                // }
                setSaveState("save changes");
                setTimeout(() => {
                    setSaveState("");
                    // setShowNewTask(false)
                    setErrors([])
                }, 500);

            } else {
                didMount.current = true;
                return null
            }

        }, 200)

        return () => clearTimeout(delayDispatch);




    }, [taskTitle, description, assigneeId, priority, status, taskId, dueDate, assignee]);

    useEffect(() => {
        // dispatch(taskAction.thunkGetOneTask(taskId))
        dispatch(getOneProject(projectId))
        // setNewTask(newTask)
        // ("")        setShowNewTask
        //  console.log("dispatch+++++++++++++++++",)
    }, [dispatch, task, newTask, projectId])

    useEffect(async () => {
        if (task) {
            didMount.current = false;
        //    await dispatch(taskAction.loadOneTask(taskId))
            // await dispatch(getOneProject(projectId))
            setTaskTitle(task?.title);
            setDescription(task?.description);
            if (task?.assigneeId) {
                setAssigneeId(task?.assigneeId);
            } else {
                setAssigneeId(task?.ownerId);
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
            if (task?.assignee) {
                // console.log(`------- task details page - task.assignee:`);
                setAssignee(task?.assignee);
                // console.log(`------- task details page - task.assignee:`);
                // setDefaultValue({ value: assignee?.id, label: `${assignee?.firstName}  ` + assignee?.lastName, color: assignee?.avatar_color, img: userLogo })
                // // console.log("%%%%%%%%%%%%% in task detail", assignee)
                // console.log("***************$$$$$$ in task detail",defaultValue)
            }
            if (task?.priority) {
                setPriority(task?.priority);
            } else {
                setPriority("---");
            }
            if (task?.status) {
                setStatus(task?.status);
            } else {
                setStatus("---");
            }
        }


    }, [task, newTask])

    ////////////////////////////////////////////////////////////////////////////////////////////

    const toggleCompleted = async (e) => {
        // e.stopPropagation();
        e.preventDefault();

        const res = await dispatch(taskAction.toggleCompleteTask(taskId));
        if (res) {
            await dispatch(getOneProject(projectId))

        }

    };



    // const deleteTask = async () => {
    //     console.log("%%%%%%%%%%%", taskId)
    //     await dispatch(taskAction.thunkDeleteTask(taskId));
    //     await dispatch(getOneProject(projectId))
    // };


    ////////////////////////////////////////////////////////////////////////////////////
    // let taskSettingUser = false
    // if (task) {
    //     if (sessionUser.id == task.ownerId || sessionUser.id == task.assigneeId) {
    //         taskSettingUser = true
    //     }

    // }



    useEffect(() => {
        const errors = [];
        if (taskTitle?.length > 30 || taskTitle?.length < 3) {
            errors.push("Title should between 3 and 30 characters")
        } else if (description?.length > 255) {
            errors.push("Description should be less than 255 characters")
        }
        // else if (!assigneeId) {
        //     errors.push("Please provided a valid assignee")
        // }

        setErrors(errors);
    }, [taskTitle, description])




    // const handleDescriptionBlur = (e) => {





    return (
        <>
            {/* <div>
                <button onClick={handleCanelCreat}>
                    Cancel Create
                </button>
            </div> */}
            {newTask?.id && <>
                <div onClick={() => {
                    setShowTaskSideDetail(true);

                }}>
                    <span>Details</span>
                    <span>
                        <i className="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
                {showTaskSideDetail && <div>
                    <TaskSideCreate setShowTaskSideDetail={setShowTaskSideDetail} taskId={newTask.id} users={users} section={section} sessionUser={sessionUser} project={project} showTaskSideDetail={showTaskSideDetail} task={newTask} setNewTask={setNewTask} defaultValue={defaultValue} setDefaultValue={setDefaultValue} assignee={assignee} setAssignee={setAssignee} />
                </div>}
            </>}



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
                        onBlur={handleTitleBlur}

                    />
                </div>




                <div>
                    <Select className='assignee-select'

                        styles={customStyles}
                        components={{ SingleValue: IconSingleValue, Option: IconOption }}
                        options={options}
                        defaultValue={defaultValue}
                        onChange={handleAssigneeChange}
                        value={options.filter(function (option) {
                            return option.value === defaultValue.value;
                        })}
                        placeholder="No assignee"
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
                    onClick={handleCanelCreat}>

                    <i className="fa-sharp fa-solid fa-circle-xmark"></i>

                </div>
            </div>


        </>
    )

}



export default TaskCreate
