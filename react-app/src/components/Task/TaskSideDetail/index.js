import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSection } from "../../../store/sectionReducer"
import { getOneProject } from "../../../store/projectReducer"
import * as taskAction from "../../../store/taskReducer"
import Select from 'react-select';
import { components } from 'react-select';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import TextareaAutosize from "react-textarea-autosize";
// import { Modal } from '../../../context/Modal';
import userLogo from "../../../img/user-logo.png"
import './TaskSideDetail.css'


const TaskSideDetail = ({ task, users, section, sessionUser, projectId, setShowTaskSideDetail, showTaskSideDetail }) => {
    const defaultAssigneeObj = users?.find(user => user?.id == task.assigneeId)
    const [saveState, setSaveState] = useState("");
    const didMount = useRef(false);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [status, setStatus] = useState(task?.status);
    const [assigneeId, setAssingeeId] = useState(task?.assigneeId);
    const dateDiv = useRef();
    // const [properDate, setProperDate] = useState();

    const [showDateForm, setShowDateForm] = useState(false);
    // const [serverDate, setServerDate] = useState();
    const [completed, setCompleted] = useState(task?.completed)
    const [dueDate, setDueDate] = useState(task?.end_date);
    // const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [priority, setPriority] = useState(task?.priority);


    const [errors, setErrors] = useState([]);
    const sectionId = section?.id
    const ownerId = task?.ownerId
    const taskId = task?.id
    ///////////////////////////////////////////////////////////////


    useEffect(() => {
        if (!showTaskSideDetail) return;

        const closeDiv = (e) => {
            if (e.target.className?.includes('ele')) return;
            setShowTaskSideDetail(false);
        };

        document.addEventListener('click', closeDiv);

        return () => document.removeEventListener("click", closeDiv);
    }, [showTaskSideDetail]);

    // assignee select///////////////////////////////////////////////////
    let options = [];
    for (let i = 0; i < users?.length; i++) {
        let assigneeObj = users[i];
        let value = assigneeObj?.id;
        let label = `${assigneeObj.firstName} ` + assigneeObj.lastName
        let color = assigneeObj?.avatar_color
        options.push({ value: value, label: label, color: color, img: userLogo })
    }

    const defaultValueObj = { value: defaultAssigneeObj?.id, label: `${defaultAssigneeObj?.firstName}  ` + defaultAssigneeObj?.lastName, color: defaultAssigneeObj?.avatar_color, img: userLogo }


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
            justifyContent: "space-around",
            width: "150px"
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: "150px",
            // gap: "10px",
            justifyContent: "space-around"
        }),
    }
    //     setDescription(e.target.value);
    // };
    /////////////////////////////////////////////////////handle change




    const handleTitleChange = (e) => {
        e.preventDefault();
        setTaskTitle(e.target.value)
    }

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);

    };
    const handleDescriptionChange = e => {
        e.preventDefault();
        setDescription(e.target.value)
    }



    const handleStatusChange = (e) => {
        setStatus(e.target.value);

    };

    const handleAssigneeChange = (e) => {
        setAssingeeId(e.value)

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

        } else {
            setDueDate(null);

        }
        if (task?.priority) {
            setPriority(task.priority);
        } else {
            setPriority("---");
        }
        if (task?.status) {
            setStatus(task.status);
        } else {
            setStatus("---");
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
                    title: taskTitle, description, assigneeId: assigneeId, ownerId, sectionId, status: status, priority: priority, projectId, end_date: dueDate, completed, taskId
                };

                const res = await dispatch(taskAction.thunkUpdateTask(payload));
                if (res) {

                    await dispatch(getOneSection(sectionId))

                    await dispatch(getOneProject(projectId))
                }
                setSaveState("save changes");
                setTimeout(() => {
                    setSaveState("");
                }, 2000);

            } else {
                didMount.current = true;
            }
        }, 1000);

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



    // const deleteTask = async () => {
    //     await dispatch(taskAction.thunkDeleteTask(taskId));
    //     await dispatch(getOneProject(projectId))
    // };


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
        if (taskTitle?.length > 50 || taskTitle?.length < 3) {
            errors.push("Title should between 3 and 50 characters")
        } else if (description?.length > 255) {
            errors.push("Description should be less than 255 characters")
        }

        setErrors(errors);
    }, [taskTitle, description])




    // const handleDescriptionBlur = (e) => {





    return (
        <>
            <div className='task-side-detail-content ele'>
                {errors.length > 0 && (<div>

                    <ul className='ele'>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>

                </div>)}
                {showTaskSideDetail && taskSettingUser &&
                    (<>
                        <div className='task-side-detail-content ele'>
                            <div className="task-complete ele">
                                <button
                                    onClick={toggleCompleted}
                                    className={
                                        task.completed
                                            ? "task-complete-button-completed ele"
                                            : "task-complete-button ele"
                                    }>

                                    <i className="fa-solid fa-circle-check ele">

                                    </i>
                                    {task.completed ? "Completed" : "Mark Complete"}
                                </button>{'  '}
                            </div>
                            <div>
                                <input className='edit-task-title ele'
                                    type='text'
                                    value={taskTitle}
                                    placeholder="New Task"
                                    // onBlur={handleTitleBlur}
                                    onChange={handleTitleChange}

                                />
                            </div>
                            <div className="task-side-description ele">
                                <TextareaAutosize className='edit-task-discription ele'
                                    type='text'
                                    value={description}
                                    placeholder="description"
                                    onChange={handleDescriptionChange}

                                />
                            </div>


                            {/* <div onClick={() => {
                                setShowTaskSideDetail(true);

                            }} className="ele">

                                <span>Details</span>
                                <span>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </span>
                            </div>
                            <div>
                                <TaskSideDetail setShowTaskSideDetail={setShowTaskSideDetail} />
                            </div> */}


                            <div className='assignee-s-d ele'>
                                <Select className='assignee-select ele'

                                    styles={customStyles}
                                    components={{ SingleValue: IconSingleValue, Option: IconOption }}
                                    options={options}
                                    defaultValue={defaultValueObj}
                                    onChange={handleAssigneeChange}
                                // isSearchable={false}
                                />
                            </div>


                            <div className='date-setting ele'>
                                <span className='dueDate-title ele'>Due date</span>
                                {showDateForm ? (
                                    <div
                                        className="task-detail-date-open ele"
                                        ref={dateDiv}
                                        onClick={() => setShowDateForm(true)}>

                                        <div className="task-calendar-icon ele">
                                            <i className="fa-light fa-calendar-day ele"></i>
                                        </div>
                                        {dueDate ? dueDate : "No due date"}
                                        <div id="task-detail-date-calendar" className='ele'>
                                            <Calendar className={"can ele"}
                                                // value={properDate}
                                                tileDisabled={tileDisabled}
                                                onChange={(date) => {
                                                    // setProperDate(date);
                                                    // setServerDate(date.toString());
                                                    handleDueDateChange(date)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="task-detail-date ele"

                                        onClick={() => setShowDateForm(true)}
                                    >
                                        <div id="task-date-icon ele">
                                            <i className="fa-regular fa-calendar-days ele"></i>
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

                            <div className="task-detail-priority ele">
                                <div className="p-title ele">Priority</div>
                                <div className="p-content ele">
                                    <select value={priority} onChange={handlePriorityChange} className="s-p ele">
                                        <option className="p-1 ele" value="Null">---</option>
                                        <option className="p-2 ele" value="Low">Low</option>
                                        <option className="p-3 ele" value="Medium">Medium</option>
                                        <option className="p-4 ele" value="High">High</option>
                                    </select>
                                </div>
                            </div>
                            <div className="task-detail-status ele">
                                <div className="s-title ele">Status</div>
                                <div className="s-labels ele">
                                    <select value={status} onChange={handleStatusChange} className="s-s ele">
                                        <option className="s-1 ele" value="Null">---</option>
                                        <option className="s-2 ele" value="On Track">On Track</option>
                                        <option className="s-3 ele" value="At Risk">At Risk</option>
                                        <option className="s-4 ele" value="Off Track">Off Track</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </>

                    )}


            </div>




        </>
    )
}

export default TaskSideDetail
