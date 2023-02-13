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

import './SingleTask.css'


const SingleTask = ({ show, task, users, section, sessionUser, projectId }) => {
    // const defaultAssigneeObj = users.find(user => user?.id == task.assigneeId)
    const [assignee, setAssignee] = useState(task?.assignee)
    const [saveState, setSaveState] = useState("");
    const [defaultValue, setDefaultValue] = useState({ value: assignee?.id, label: `${assignee?.firstName}  ` + assignee?.lastName, color: assignee?.avatar_color, img: userLogo })
    const didMount = useRef(false);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState(task?.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [assigneeId, setAssigneeId] = useState(task?.assigneeId);
    const dateDiv = useRef();
    const taskDetailRef = useRef();

    const [properDate, setProperDate] = useState();
    const project = useSelector(state => state.projects.singleProject)
    // const [timer, setTimer] = useState(null)
    const [showDateForm, setShowDateForm] = useState(false);
    const [completed, setCompleted] = useState(task.completed)
    const [dueDate, setDueDate] = useState(task.end_date);
    const [priority, setPriority] = useState(task.priority);
    const [showTaskSideDetail, setShowTaskSideDetail] = useState(false);
    const [errors, setErrors] = useState([]);
    const sectionId = section.id
    const ownerId = task.ownerId
    const taskId = task.id
    const assigneeClass = show ? "task-assignee-column" : "task-assignee-closed"
    const assigneeReadClass = show ? "task-assignee-column2" : "task-assignee-closed2"
    const deleteClass = show ? "task-delete" : "task-delete-closed"
    const priorityId = show ? "mySelect" : "mySelect-closed"
    const [selectPriority, setSelectPriority] = useState();
    const [selectStatus, setSelectStatus] = useState();





    // assignee select///////////////////////////////////////////////////
    let options = [{ value: 0, label: "No assignee", color: "gray", img: userLogo }];
    for (let i = 0; i < users.length; i++) {
        let assigneeObj = users[i];
        let value = assigneeObj.id;
        let label = `${assigneeObj.firstName} ` + assigneeObj.lastName
        let color = assigneeObj?.avatar_color
        options.push({ value: value, label: label, color: color, img: userLogo })
    }

    // defaultValue = { value: assignee?.id, label: `${assignee?.firstName}  ` + assignee?.lastName, color: assignee?.avatar_color, img: userLogo }

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

    const Input = (props) => (
        <components.Input {...props} readOnly={props.selectProps.isReadOnly} />
    );

    const MySelect = (props) => {
        const menuIsOpen = props.isReadOnly ? false : props.menuIsOpen;
        return <Select components={{ Input }} {...props} menuIsOpen={menuIsOpen} />;
    };

    const customStyles = {
        option: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: "space-between",
            width: "220px",
            cursor: "pointer",
            borderRadius: "5px"
            //    padding: "10px"
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: "170px",
            justifyContent: "space-between",
            // cursor: "pointer"
        }),
    }
    //     setDescription(e.target.value);
    // };
    /////////////////////////////////////////////////////handle change




    const handleTitleChange = (e) => {
        // e.preventDefault();
        setTaskTitle(e.target.value)
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {

            e.target.blur();


        }

    }









    const handlePriorityChange = (e) => {
        setPriority(e.target.value);

        const select = e.target
        setSelectPriority(select.options[select.selectedIndex].className)


        // const payload = {
        //     title: taskTitle, discription, assigneeId, ownerId, sectionId, status, priority:e.target.value, projectId, end_date: dueDate, completed, taskId
        // }
        // dispatch(taskAction.thunkUpdateTask(payload))
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        const select = e.target
        setSelectStatus(select.options[select.selectedIndex].className)

    };


    const handleAssigneeChange = (e) => {
        const assinId = parseInt(e.value)
        // console.log("###############,typeOf",typeof(assinId),assinId)

        setAssigneeId(assinId)
        setDefaultValue(e);

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
        if (task.end_date) {
            setDueDate(task.end_date);
            let newDueDate = new Date(task.end_date);
            const date = newDueDate.getDate() + 1
            const newDate = newDueDate.setDate(date)
            const adjustedNewDate = new Date(newDate)
            setProperDate(adjustedNewDate);

        } else {
            setDueDate(null);
            setProperDate(new Date());
        }
        if (task?.assignee) {

            setAssignee(task.assignee);


        } else if (task.assignee === "null" || task.assignee === null) {
            setDefaultValue({ value: 0, label: "No assignee", color: "gray", img: userLogo })
        }


        if (task?.assigneeId) {
            setAssigneeId(task.assigneeId);
        } else {
            setAssigneeId(null);
        }

        if (task.title) {
            setTaskTitle(task.title);
        } else {
            setTaskTitle("");
        }

        if (task?.priority) {
            setPriority(task.priority);
        } else {
            setPriority("---");
        }
        if (task.priority === "---") {
            setSelectPriority("p-1")
        } else if (task.priority === "Low") {
            setSelectPriority("p-2")
        } else if (task.priority === "Medium") {
            setSelectPriority("p-3")
        } else if (task.priority === "High") {
            setSelectPriority("p-4")
        }
        if (task?.status) {
            setStatus(task.status);
        } else {
            setStatus("---");
        }

        if (task.status === "---") {
            setSelectStatus("s-1")
        } else if (task.status === "On Track") {
            setSelectStatus("s-2")
        } else if (task.status === "At Risk") {
            setSelectStatus("s-3")
        } else if (task.status === "Off Track") {
            setSelectStatus("s-4")
        }
    }, [task])




    useEffect(() => {
        if (showDateForm) {
            document.addEventListener("mousedown", handleClickDate);
            return () => {
                document.removeEventListener("mousedown", handleClickDate);
            };
        }
    }, [showDateForm]);

    const handleClickDate = (e) => {
        if (dateDiv.current?.contains(e.target)) {
            return;
        }
        setShowDateForm(false)
        return;
    };
    //////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const delayDispatch = setTimeout(async () => {
            if (didMount.current) {
                const payload = {
                    title: taskTitle, description, assigneeId, ownerId, sectionId, status: status, priority: priority, projectId, end_date: dueDate, completed,taskId
                };

                const res = await dispatch(taskAction.thunkUpdateTask(payload));
                if (res) {
                    // await dispatch(taskAction.loadOneTask(taskId))
                    await dispatch(getOneProject(projectId))
                }
                setSaveState("save changes");
                setTimeout(() => {
                    setSaveState("");
                }, 1000);

            } else {
                didMount.current = true;
            }
        }, 500);

        return () => clearTimeout(delayDispatch);
    }, [taskTitle, description, assigneeId, priority, status, dueDate]);



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
        await dispatch(taskAction.thunkDeleteTask(taskId));
        await dispatch(getOneProject(projectId))
    };


    ////////////////////////////////////////////////////////////////////////////////////
    let taskSettingUser = false
    if (task) {
        if (sessionUser.id == task.ownerId || sessionUser.id == task.assigneeId) {
            taskSettingUser = true
        }

    }

    // const [showTaskEditModal, setShowTaskEditModal] = useState(false);

    useEffect(() => {
        const errors = [];
        if (taskTitle.length > 30 || taskTitle.length < 3) {
            errors.push("Title should between 3 and 30 characters")
        } else if (description.length > 255) {
            errors.push("Description should be less than 255 characters")
        }
        setErrors(errors);
    }, [taskTitle, description])





    // Handel close TasksideDetail when click outside
    //////////////////////////////////////////////////////////////////////////////////////////////////


    const handleClickTask = e => {
         console.log("#####################,TaskDetail e", e)
        if (e && e.target && e.target?.className && typeof e.target?.className?.includes!=='undefined' &&(e.target?.className?.includes('ref'))) {
            return;
        } else if (e && e.target && e.target.className.includes("css")) {
            return
        } else if (e && e.target && e.target.className.includes("react-calendar")) {
            return
        } else if (e && e.target && e.target.className.includes("abbr")) {
            return
        } else if (e && e.target && e.target.type === "abbr") {
            return
        } else if (e && e.target && e.target.localName === "abbr") {
            return
        } else if (e && e.target && e.target?.offsetParent?.className.includes("ref")) {
            return
        }

        // else if (e.path[0]?.className && typeof e.path[0]?.className.includes !== 'undefined' && (e.path[0]?.className.includes("css"))) {
        //     return;
        // } else if (e.path[1]?.className && typeof e.path[1]?.className.includes !=='undefined'&&(e.path[1]?.className.includes("css"))) {
        //     return;
        // } else if (e.path[0]?.className && typeof e.path[0]?.className.includes !=='undefined'&&(e.path[0]?.className.includes("abbr")) ){
        //     return;
        // } else if (e.path[1]?.className && typeof e.path[1]?.className.includes !=='undefined'&&(e.path[1]?.className.includes("react-calendar"))) {
        //     return;
        // }



        else {
            setShowTaskSideDetail(false)
        }

    }
    useEffect(() => {

        if (showTaskSideDetail) {
            document.addEventListener("click", handleClickTask);
            return () => {
                document.removeEventListener("click", handleClickTask);
            };
        }
    }, [showTaskSideDetail]);








    //////////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <>

            {showTaskSideDetail && <div
                className='task-side-div ref'>
                <TaskSideDetail setShowTaskSideDetail={setShowTaskSideDetail} defaultValue={defaultValue} setDefaultValue={setDefaultValue} taskId={taskId} users={users} section={section} sessionUser={sessionUser} project={project} showTaskSideDetail={showTaskSideDetail} task={task} assignee={assignee} setAssignee={setAssignee} show={show} />
            </div>}

            {
                taskSettingUser ?
                    (<>

                        <div className='task-detail-content ref'>

                            <div className='task-first-column ref'>
                                {errors.length > 0 && (<div>

                                    <ul className='errors-task ref'>
                                        {errors.map((error, idx) => <li className="ref" key={idx}>{error}</li>)}
                                    </ul>

                                </div>)}

                                <div className="task-complete ref" >
                                    <div
                                        onClick={toggleCompleted}
                                        className={
                                            task.completed
                                                ? "task-complete-button-completed ref"
                                                : "task-complete-button ref"
                                        }>

                                        <i className="fa-solid fa-circle-check ref">

                                        </i>
                                        <span className='ref'>
                                            {task.completed ? "Completed" : "Mark Complete"}
                                        </span>
                                    </div>{'  '}
                                </div>

                                <div className='task-input-title ref'>
                                    <input className='edit-task-title ref'
                                        type='text'
                                        value={taskTitle}
                                        placeholder="Task title"
                                        onKeyDown={handleKeyDown}

                                        // onBlur={handleTitleBlur}
                                        onChange={handleTitleChange}


                                    />
                                </div>
                                {task && <div className="task-side-open ">
                                    <span className='open-title' onClick={() => {
                                        setShowTaskSideDetail(true);
                                    }}>Details</span>
                                    <span className='open-icon' onClick={() => {
                                        setShowTaskSideDetail(true);

                                    }}>
                                        <i className="fa-solid fa-chevron-right"></i>
                                    </span>
                                </div>
                                }
                            </div>



                            <div className={`${assigneeClass} ref`}>
                                <p className='assignee-title ref'>Assignee</p>
                                <Select className='assignee-select ref'
                                    ref={taskDetailRef}
                                    styles={customStyles}
                                    components={{ SingleValue: IconSingleValue, Option: IconOption }}
                                    options={options}
                                    defaultValue={defaultValue}
                                    onChange={handleAssigneeChange}
                                    value={options.filter(function (option) {
                                        return option.value === defaultValue.value;
                                    })}
                                // value={defaultValue}
                                // isSearchable={false}
                                />
                            </div>


                            <div className='date-setting ref'>
                                <p className='dueDate-title ref'>Due date</p>
                                {showDateForm ? (
                                    <div
                                        className="task-detail-date-open ref"
                                        ref={dateDiv}
                                        onClick={() => setShowDateForm(true)}>

                                        <div className="task-calendar-icon ref" >
                                            <i className="fa-light fa-calendar-day ref"></i>
                                        </div>
                                        <div className="dueDate-title ref" >
                                            {dueDate ? dueDate : "No due date"}
                                        </div>

                                        <div id="task-detail-date-calendar" className='ref' >
                                            <Calendar
                                                className={"ref"}

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
                                        className="task-detail-date ref"


                                        onClick={() => setShowDateForm(true)}
                                    >
                                        <div id="task-date-icon" className='ref'
                                        >
                                            <i className="fa-regular fa-calendar-days ref"></i>
                                        </div>
                                        {dueDate ? (
                                            <div className='ref'>
                                                {dueDate}

                                            </div>
                                        ) : (
                                            "No due date"
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="task-detail-priority ref"  >
                                <p className="p-title ref">Priority</p>
                                <div className='priority-select ref' >
                                    <select value={priority} onChange={handlePriorityChange} id="mySelect"
                                        className={`${selectPriority} ref`} >
                                        <option className="p-1 ref" value="---">---</option>
                                        <option className="p-2 ref" value="Low">Low</option>
                                        <option className="p-3 ref" value="Medium">Medium</option>
                                        <option className="p-4 ref" value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="task-detail-status ref" >
                                <p className="s-title ref">Status</p>
                                <div className="s-labels ref">
                                    <select value={status} onChange={handleStatusChange} id="mySelect" className={`${selectStatus} ref`}>
                                        <option className="s-1 ref" value="---">---</option>
                                        <option className="s-2 ref" value="On Track">On Track</option>
                                        <option className="s-3 ref" value="At Risk">At Risk</option>
                                        <option className="s-4 ref" value="Off Track">Off Track</option>
                                    </select>
                                </div>
                            </div>
                            <div className={`${deleteClass}`}
                                onClick={deleteTask}>
                                <span className='ref'>Delete task</span>
                                <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                            </div>
                        </div>
                    </>

                    )



                    : (
                        <>
                            <div className='task-detail-content ref'>
                                <div className='task-first-column2 ref'>
                                    <span className={
                                        task.completed
                                            ? "task-complete-button-completed ref"
                                            : "task-complete-button ref"
                                    }>
                                        <i className="fa-solid fa-circle-check ref">

                                        </i>
                                    </span>

                                    <input className='read-task-input ref'
                                        type='text'
                                        value={taskTitle}
                                        onChange={(e) => handleTitleChange(e)}
                                        readOnly
                                    />
                                    {task && <div onClick={() => {
                                        setShowTaskSideDetail(true);


                                    }} className="task-side-open">

                                        <span className='open-title '>Details</span>
                                        <span className='open-icon '>
                                            <i className="fa-solid fa-chevron-right "></i>
                                        </span>
                                    </div>
                                    }
                                </div>

                                <div className={`${assigneeReadClass} ref`}>
                                    <MySelect className='assignee-select-disable ref'

                                        styles={customStyles}
                                        components={{ SingleValue: IconSingleValue }}
                                        defaultValue={defaultValue}
                                        isReadOnly={true}
                                        isSearchable={false}

                                    />
                                </div>

                                <div className='due-date-read ref'>
                                    {/* <span>Due Date</span> */}
                                    <span className='read-dueDate ref'>{dueDate}</span>
                                </div>
                                <div className="task-detail-priority2 ref">

                                    <span className={`${selectPriority} ref`} id="read-priority">{priority}</span>
                                </div>
                                <div className="task-detail-status2 ref">

                                    <span className={`${selectStatus} ref`} id="read-priority">{status}</span>
                                </div>



                            </div>
                        </>




                    )
            }



        </>
    )
}

export default SingleTask
