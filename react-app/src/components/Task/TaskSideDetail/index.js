import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSection } from "../../../store/sectionReducer"
import { getOneProject } from "../../../store/projectReducer"
import * as taskAction from "../../../store/taskReducer"
import Select from 'react-select';
import { components } from 'react-select';
// import 'node_modules/react-select/dist/react-select.css';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import TextareaAutosize from "react-textarea-autosize";
import userLogo from "../../../img/user-logo.png"
import './TaskSideDetail.css'



const TaskSideDetail = ({ show, assignee, setAssignee, defaultValue, setDefaultValue, task, taskId, users, section, sessionUser, project, setShowTaskSideDetail, showTaskSideDetail }) => {
    // console.log("*******************%%%%%%%%%%%%%%% task in sideBar", task)
    console.log("showTaskDetail", showTaskSideDetail)
    // const [assignee, setAssingee] = useState(task?.assignee)
    // const [defaultValue, setDefaultValue] = useState({ value: assignee?.id, label: `${assignee?.firstName}  ` + assignee?.lastName, color: assignee?.avatar_color, img: userLogo })
    // // const defaultAssiObj = users?.find(user => user?.id == task?.ownerId)
    const taskOwnerObj = users?.find(user => user?.id == task?.ownerId)
    const [saveState, setSaveState] = useState("");
    const didMount = useRef(false);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [status, setStatus] = useState(task?.status);
    const [assigneeId, setAssigneeId] = useState(task?.assigneeId);
    const dateDiv = useRef();
    const [properDate, setProperDate] = useState();
    const [showDateForm, setShowDateForm] = useState(false);
    // const [serverDate, setServerDate] = useState();
    const [completed, setCompleted] = useState(task?.completed)
    const [dueDate, setDueDate] = useState(task?.end_date);
    const [priority, setPriority] = useState(task?.priority);
    const taskSideClass = show ? "taskSide-detail" : "taskSide-detail-closed"
    const readSideClass = show ? "readSide-deatil" : "readSide-detail-closed"
    const [selectPriority, setSelectPriority] = useState();
    const [selectStatus, setSelectStatus] = useState();
    // const [timer, setTimer] = useState(null)
    let newTask = useSelector(state => state.tasks.singleTask)



    const [errors, setErrors] = useState([]);
    const projectId = project?.id
    const sectionId = section?.id
    const ownerId = task?.ownerId

    ///////////////////////////////////////////////////////////////

    const closeDiv = (e) => {
        // if (e.target?.className.includes('sdetail')) return;
        setShowTaskSideDetail(false);
    };

    useEffect(() => {
        dispatch(taskAction.thunkGetOneTask(taskId))
        // dispatch(getOneProject(projectId))
        //  console.log("dispatch+++++++++++++++++",)
    }, [dispatch, taskId])


    // assignee select///////////////////////////////////////////////////
    let options = [{ value: 0, label: "No assignee", color: "gray", img: userLogo }];
    for (let i = 0; i < users?.length; i++) {
        let assigneeObj = users[i];
        let value = assigneeObj?.id;
        let label = `${assigneeObj.firstName} ` + assigneeObj.lastName
        let color = assigneeObj?.avatar_color
        options.push({ value: value, label: label, color: color, img: userLogo })
    }

    // defaultValue = { value: assignee?.id, label: `${assignee?.firstName}  ` + assignee?.lastName, color: assignee?.avatar_color, img: userLogo }
    // const defaultAssiValueObj = { value: defaultAssiObj?.id, label: `${defaultAssiObj?.firstName}  ` + defaultAssiObj?.lastName, color: defaultAssiObj?.avatar_color, img: userLogo }

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
            width: "200px",
            cursor: "pointer"

        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: "200px",
            // gap: "10px",
            justifyContent: "space-between",
            // cursor: "pointer"
        }),
    }
    //     setDescription(e.target.value);
    // };
    /////////////////////////////////////////////////////handle change




    const handleTitleChange = (e) => {

        setTaskTitle(e.target.value)
    }

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
        const select = e.target
        setSelectPriority(select.options[select.selectedIndex].className)

    };
    const handleDescriptionChange = e => {

        setDescription(e.target.value)
    }



    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        const select = e.target
        setSelectStatus(select.options[select.selectedIndex].className)

    };

    const handleAssigneeChange = (e) => {
        const assinId = parseInt(e.value)
        // console.log("###############,typeOf",typeof(assinId),assinId)
        setAssigneeId(assinId)
        setDefaultValue(e)
        // const payload = {
        //     title: taskTitle, description, assigneeId: assinId, ownerId, sectionId, status, priority, projectId, end_date: dueDate, completed, taskId
        // }
        // dispatch(taskAction.thunkUpdateTask(payload))
        // clearTimeout(timer)
        // const newTimer = setTimeout(() => {
        //     dispatch(getOneSection(sectionId))

        // },500)

        // setTimer(newTimer)
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
        if (task?.end_date) {
            setDueDate(task.end_date);
            let newDueDate = new Date(task.end_date);
            const date = newDueDate.getDate() + 1
            const newDate = newDueDate.setDate(date)
            const adjustedNewDate = new Date(newDate)
            setProperDate(adjustedNewDate);
            // setServerDate(adjustedDate);
        } else {
            setDueDate(null);
            // setServerDate(null);
            setProperDate(new Date());


        }
        if (task?.assigneeId) {
            setAssigneeId(task.assigneeId);
        } else {
            setAssigneeId(null);
        }


        if (task?.assignee) {

            setAssignee(task?.assignee);
            // setDefaultValue({ value: assignee?.id, label: `${assignee?.firstName}  ` + assignee?.lastName, color: assignee?.avatar_color, img: userLogo })
            // // console.log("@@@@@@@@@@@@@@", defaultValue)
            // console.log("*****************", assignee)
        } else if (task?.assignee === "null" || task?.assignee === null) {
            setDefaultValue({ value: 0, label: "No assignee", color: "gray", img: userLogo })
        }

        if (task?.title) {
            setTaskTitle(task.title);
        } else {
            setTaskTitle("");
        }

        if (task?.priority) {
            setPriority(task.priority);
        } else {
            setPriority("---");
        }
        if (task.priority === "Null") {
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
        if (task.status === "Null") {
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
                    title: taskTitle, description, assigneeId, ownerId, sectionId, status: status, priority: priority, projectId, end_date: dueDate, completed, taskId
                };

                const res = await dispatch(taskAction.thunkUpdateTask(payload));
                if (res) {

                    // await dispatch(taskAction.thunkGetOneTask(taskId))

                    await dispatch(getOneProject(projectId))
                }
                setSaveState("save changes");
                setTimeout(() => {
                    setSaveState("");

                }, 800);

            } else {
                didMount.current = true;
              ;
            }
        }, 500);

        return () => clearTimeout(delayDispatch);
    }, [taskTitle, description, assigneeId, priority, status, dueDate, taskId]);



    ////////////////////////////////////////////////////////////////////////////////////////////

    const toggleCompleted = async (e) => {
        // e.stopPropagation();
        e.preventDefault();
        const res = await dispatch(taskAction.toggleCompleteTask(taskId));
        if (res) {
            await dispatch(getOneProject(projectId))
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
    let taskSettingUser = false
    if (task) {
        if (sessionUser.id == task.ownerId || sessionUser.id == task.assigneeId) {
            taskSettingUser = true
        }

    }
    useEffect(() => {
        const errors = [];
        if (taskTitle?.length > 30 || taskTitle?.length < 3) {
            errors.push("Title should be between 3 to 30 characters")
        } else if (description?.length > 255) {
            errors.push("Description should be less than 255 characters")
        }


        setErrors(errors);
    }, [taskTitle, description])




    // const handleDescriptionBlur = (e) => {





    return (
        <>

            {taskSettingUser &&
                (<div className={taskSideClass}>
                    <div className='close-s-div' onClick={closeDiv}>
                        <span id="tip-text">Close details</span>
                        <span className='icon-exit'>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </span>

                    </div>
                    <div className='s-detail-content'>
                        {errors.length > 0 && (<div>

                            <ul className='t-s-error-list2'>
                                {errors.map((error, idx) => <li key={idx} className="t-s-e sdetail">{error}</li>)}
                            </ul>

                        </div>)}

                        <div className="s-complete">
                            <button
                                onClick={toggleCompleted}
                                className={
                                    task.completed
                                        ? "s-complete-button-completed"
                                        : "s-complete-button"
                                }>

                                <i className="fa-solid fa-circle-check" id="s-check-icon">

                                </i>
                                {task.completed ? "Completed" : "Mark Complete"}
                            </button>{'  '}
                        </div>

                        <div>
                            <input className='s-task-title'
                                type='text'
                                value={taskTitle}
                                placeholder="Write a task name"
                                onChange={handleTitleChange}

                            />
                        </div>


                        <div className='assignee-s-d'>
                            <span className='s-s-title'>Assignee: </span>
                            <Select className='s-assignee-select'

                                styles={customStyles}
                                components={{ SingleValue: IconSingleValue, Option: IconOption }}
                                options={options}
                                defaultValue={defaultValue}
                                onChange={handleAssigneeChange}
                                // value={options.filter(function (option) {
                                //     return option.value === defaultValue.value;
                                // })}
                                value={defaultValue}
                            />



                        </div>


                        <div className='s-date-setting'>
                            <span className='s-dueDate-title'>Due date:</span>
                            {showDateForm ? (
                                <div
                                    className="s-date-open"
                                    ref={dateDiv}
                                    onClick={() => setShowDateForm(true)}>

                                    <div className="s-calendar-icon">
                                        <i className="fa-light fa-calendar-day" id="s-canlendar-i"></i>
                                    </div>
                                    <div className='s-t-c-title'>  {dueDate ? dueDate : "No due date"}</div>

                                    <div id="s-date-calendar" className='calender'>
                                        <Calendar className="s-calendar"
                                            value={properDate}
                                            tileDisabled={tileDisabled}
                                            onChange={(date) => {
                                                setProperDate(date);
                                                // setServerDate(date.toString());
                                                handleDueDateChange(date)
                                            }} />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="s-date-div"

                                    onClick={() => setShowDateForm(true)}>

                                    <div id="s-showDate-icon">
                                        <i className="fa-regular fa-calendar-days"></i>
                                    </div>
                                    {dueDate ? (
                                        <div className='s-t-dueDate'>
                                            {dueDate}

                                        </div>
                                    ) : (
                                        "No due date"
                                    )}
                                </div>
                            )}
                        </div>
                        <div className=' t-s-p'>
                            <span className='t-stp'>
                                Projects:
                            </span>
                            <span><img className={`single-project-icon2`} src={project?.icon} style={{ backgroundColor: project?.color }} alt='single-project-icon' /></span>
                            <span className='t-p-t'>{project.title}</span>
                        </div>

                        <div className="s-priority">
                            <div className="s-p-title">Priority:</div>
                            <div className="s-p-content">
                                <select value={priority} onChange={handlePriorityChange} className={selectPriority}>
                                    <option className="p-1" value="Null">---</option>
                                    <option className="p-2" value="Low">Low</option>
                                    <option className="p-3" value="Medium">Medium</option>
                                    <option className="p-4" value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="s-status">
                            <div className="s-s-title">Status:</div>
                            <div className="s-s-labels">
                                <select value={status} onChange={handleStatusChange} className={selectStatus}>
                                    <option className="s-1" value="Null">---</option>
                                    <option className="s-2" value="On Track">On Track</option>
                                    <option className="s-3" value="At Risk">At Risk</option>
                                    <option className="s-4" value="Off Track">Off Track</option>
                                </select>
                            </div>
                        </div>
                        <div className="side-description">
                            <div className="s-d-title">Description :</div>
                            <TextareaAutosize className='edit-s-discription'
                                // maxLength={256}
                                type='text'
                                value={description}
                                placeholder="Description"
                                onChange={handleDescriptionChange}

                            />
                        </div>
                        <div className='s-owner-info'>
                            <span className='s-o-logo'> <img className='s-o-i' src={userLogo} style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: taskOwnerObj.avatar_color }} /> </span>
                            <span className='s-o-name'>{taskOwnerObj.firstName} {taskOwnerObj.lastName} created this task</span>
                        </div>


                    </div>
                </div>

                )}




            {!taskSettingUser && (
                <div className={readSideClass}>
                    <div className='close-s-div' onClick={closeDiv}>
                        <span id="tip-text">Close details</span>
                        <span className='icon-exit'>
                            <i className="fa-solid fa-right-to-bracket"></i>
                        </span>
                    </div>
                    <div className="s-completed-2">
                        <span
                            className={
                                task.completed
                                    ? "s-complete-button-completed2"
                                    : "s-complete-button2"
                            }>

                            <i className="fa-solid fa-circle-check" id="s-check-icon">

                            </i>
                            {/* {task.completed ? "Completed" : "Mark Complete"} */}
                        </span>{'  '}
                    </div>
                    <div>
                        <input className='s-r-task-input'
                            type='text'
                            value={taskTitle}
                            onChange={handleTitleChange}
                            readOnly
                        />
                    </div>
                    <div className='assignee-s-d-r' >

                        <span className='s-s-title'>Assignee : </span>
                        <MySelect className='s-r-select'

                            styles={customStyles}
                            components={{ SingleValue: IconSingleValue }}
                            defaultValue={defaultValue}
                            isReadOnly={true}
                            isSearchable={false} />
                    </div>

                    <div className='s-r-dueDate'>
                        <span className='s-dueDate-title'>Due Date :</span>
                        {dueDate ? (
                            <div className='s-r-d-date'>
                                {dueDate}

                            </div>
                        ) : (
                            "No due date"
                        )}
                    </div>
                    <div className='s-r-p'>
                        <span className='s-r-p-title'>Priority :</span>
                        <span className={selectPriority} id="r-side-p">{priority}</span>
                    </div>
                    <div className='s-r-p'>
                        <span className=''>Status :</span>
                        <span className={selectStatus} id="r-side-s">{status}</span>
                    </div>
                    <div className='t-s-d'>
                        <spans className="t-s-t"> Description : </spans>
                        {description ? (
                            <div className='t-s-d-c'><p className='d-p'>{description}</p></div>

                        ) : (
                            "No description"
                        )}
                    </div>
                    <div className='s-owner-info'>
                        <span className='s-o-logo'> <img className='s-o-i' src={userLogo} style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: taskOwnerObj?.avatar_color }} /> </span>
                        <span className='s-o-name'>{taskOwnerObj?.firstName} {taskOwnerObj?.lastName} created this task</span>
                    </div>
                </div>

            )}

        </>)
}




export default TaskSideDetail
