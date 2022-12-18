import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProject } from "../../../store/projectReducer"
import * as taskAction from "../../../store/taskReducer"
import Select from 'react-select';
import { components } from 'react-select';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import TextareaAutosize from "react-textarea-autosize";
import userLogo from "../../../img/user-logo.png"
import './TaskSideDetail.css'


const TaskSideDetail = ({ task, taskId, users, section, sessionUser, project, setShowTaskSideDetail, showTaskSideDetail }) => {
    // const task = useSelector(state => state.tasks.singleTask)
    console.log("task in sideBar 2222222222222",task)
    const defaultAssigneeObj = users?.find(user => user?.id == task?.assigneeId)
    const defaultAssiObj = users?.find(user => user?.id == task?.ownerId)
    const taskOwnerObj = users?.find(user => user?.id == task?.ownerId)
    const [saveState, setSaveState] = useState("");
    const didMount = useRef(false);
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState(task?.title);
    const [description, setDescription] = useState(task?.description);
    const [status, setStatus] = useState(task?.status);
    const [assigneeId, setAssingeeId] = useState(task?.assigneeId);
    const dateDiv = useRef();
    const [properDate, setProperDate] = useState();
    const [showDateForm, setShowDateForm] = useState(false);
    // const [serverDate, setServerDate] = useState();
    const [completed, setCompleted] = useState(task?.completed)
    const [dueDate, setDueDate] = useState(task?.end_date);
    const [priority, setPriority] = useState(task?.priority);



    const [errors, setErrors] = useState([]);
    const projectId = project?.id
    const sectionId = section?.id
    const ownerId = task?.ownerId

    ///////////////////////////////////////////////////////////////

    const closeDiv = (e) => {
        if (e.target?.className.includes('sdetail')) return;
        setShowTaskSideDetail(false);
    };

    useEffect(() => {
        if (!showTaskSideDetail) return;

        document.addEventListener('click', closeDiv);

        return () => document.removeEventListener("click", closeDiv);
    }, [showTaskSideDetail]);

    useEffect(() => {
       const loadTask= dispatch(taskAction.loadOneTask(taskId))
        console.log("###############",loadTask)
    }, [taskId])

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
    const defaultAssiValueObj = { value: defaultAssiObj?.id, label: `${defaultAssiObj?.firstName}  ` + defaultAssiObj?.lastName, color: defaultAssiObj?.avatar_color, img: userLogo }

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
        setTaskTitle(e.target.value)
    }

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);

    };
    const handleDescriptionChange = e => {
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
                    title: taskTitle, description, assigneeId, ownerId, sectionId, status: status, priority: priority, projectId, end_date: dueDate, completed, taskId
                };

                const res = await dispatch(taskAction.thunkUpdateTask(payload));
                if (res) {

                    //    await dispatch(taskAction.thunkGetOneTask(taskId))

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
        if (taskTitle?.length > 50 || taskTitle?.length < 3) {
            errors.push("Title should be between 3 to 50 characters")
        } else if (description?.length > 255) {
            errors.push("Description should be less than 255 characters")
        } else if (!assigneeId) {
            errors.push("Please provided a valid assignee")
        }

        setErrors(errors);
    }, [taskTitle, description, assigneeId])




    // const handleDescriptionBlur = (e) => {





    return (
        <div className='task-side-detail-content sdetail'>

            <div className='close-s-div' onClick={closeDiv}>
                <i className="fa-solid fa-right-to-bracket"></i>
            </div>

            {showTaskSideDetail && taskSettingUser &&
                (<>

                    <div className='s-detail-content sdetail'>
                        <div className="s-complete sdetail">
                            <button
                                onClick={toggleCompleted}
                                className={
                                    task.completed
                                        ? "s-complete-button-completed sdetail"
                                        : "s-complete-button sdetail"
                                }>

                                <i className="fa-solid fa-circle-check sdetail" id="s-check-icon">

                                </i>
                                {task.completed ? "Completed" : "Mark Complete"}
                            </button>{'  '}
                        </div>
                        {errors.length > 0 && (<div>

                            <ul className='t-s-error-list sdetail'>
                                {errors.map((error, idx) => <li key={idx} className="t-s-e sdetail">{error}</li>)}
                            </ul>

                        </div>)}
                        <div>
                            <input className='s-task-title sdetail'
                                type='text'
                                value={taskTitle}
                                placeholder="Write a task name"
                                onChange={handleTitleChange}

                            />
                        </div>


                        <div className='assignee-s-d sdetail'>
                            {defaultValueObj ? (<Select className='s-assignee-select sdetail'

                                styles={customStyles}
                                components={{ SingleValue: IconSingleValue, Option: IconOption }}
                                options={options}
                                defaultValue={defaultValueObj}
                                onChange={handleAssigneeChange} />) : (<Select className='s-assignee-select sdetail'

                                    styles={customStyles}
                                    components={{ SingleValue: IconSingleValue, Option: IconOption }}
                                    options={options}
                                    defaultValue={defaultAssiValueObj}
                                    onChange={handleAssigneeChange} />)
                                // isSearchable={false}

                            }
                        </div>


                        <div className='s-date-setting sdetail'>
                            <span className='s-dueDate-title sdetail'>Due date</span>
                            {showDateForm ? (
                                <div
                                    className="s-date-open sdetail"
                                    ref={dateDiv}
                                    onClick={() => setShowDateForm(true)}>

                                    <div className="s-calendar-icon sdetail">
                                        <i className="fa-light fa-calendar-day sdetail" id="s-canlendar-i"></i>
                                    </div>
                                    {dueDate ? dueDate : "No due date"}
                                    <div id="s-date-calendar" className='calender sdetail'>
                                        <Calendar className="s-calendar sdetail"
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
                                    className="s-date-div sdetail"

                                    onClick={() => setShowDateForm(true)}>

                                    <div id="s-showDate-icon sdetail">
                                        <i className="fa-regular fa-calendar-days sdetail"></i>
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
                        <div className=' t-s-p sdetail'>
                            <span className='t-stp sdetail'>
                                Projects
                            </span>
                            <span><img className={`single-project-icon sdetail`} src={project?.icon} style={{ backgroundColor: project?.color }} alt='single-project-icon' /></span>
                            <span className='t-p-t sdetail'>{project.title}</span>
                        </div>

                        <div className="s-priority sdetail">
                            <div className="s-p-title sdetail">Priority</div>
                            <div className="s-p-content sdetail">
                                <select value={priority} onChange={handlePriorityChange} className="s-p sdetail">
                                    <option className="s-p-1 sdetail" value="Null">---</option>
                                    <option className="s-p-2 sdetail" value="Low">Low</option>
                                    <option className="s-p-3 sdetail" value="Medium">Medium</option>
                                    <option className="s-p-4 sdetail" value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="s-status sdetail">
                            <div className="s-s-title sdetail">Status</div>
                            <div className="s-s-labels sdetail">
                                <select value={status} onChange={handleStatusChange} className="s-s sdetail">
                                    <option className="s-s-1 sdetail" value="Null">---</option>
                                    <option className="s-s-2 sdetail" value="On Track">On Track</option>
                                    <option className="s-s-3 sdetail" value="At Risk">At Risk</option>
                                    <option className="s-s-4 sdetail" value="Off Track">Off Track</option>
                                </select>
                            </div>
                        </div>
                        <div className="side-description sdetail">
                            <TextareaAutosize className='edit-s-discription sdetail'
                                type='text'
                                value={description}
                                placeholder="Description"
                                onChange={handleDescriptionChange}

                            />
                        </div>
                        <div className='s-owner-info sdetail'>
                            <span className='s-o-logo sdetail'> <img className='s-o-i sdetail' src={userLogo} style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: taskOwnerObj.avatar_color }} /> </span>
                            <span className='s-o-name sdetail'>{taskOwnerObj.firstName} {taskOwnerObj.lastName} created this task</span>
                        </div>


                    </div>
                </>

                )}




            {showTaskSideDetail && !taskSettingUser && (
                <div>

                    <div>
                        <input className='s-r-task-input sdetail'
                            type='text'
                            value={taskTitle}
                            onChange={handleTitleChange}
                            readOnly
                        />
                    </div>
                    <div>

                        <MySelect className='s-r-select sdetail'

                            styles={customStyles}
                            components={{ SingleValue: IconSingleValue }}
                            defaultValue={defaultValueObj}
                            isReadOnly={true}
                            isSearchable={false} />
                    </div>

                    <div className='s-r-dueDate sdetail'>
                        <span className='s-dueDate-title sdetail'>Due Date</span>
                        {dueDate ? (
                            <div className='s-r-d-date sdetail'>
                                {dueDate}

                            </div>
                        ) : (
                            "No due date"
                        )}
                    </div>
                    <div className='s-r-p sdetail'>
                        <span className='s-r-p-title sdetail'>Priority</span>
                        <span className='s-r-p sdetail'>{priority}</span>
                    </div>
                    <div className='s-r-status sdetail'>
                        <span className='s-r-s-title sdetail'>Status</span>
                        <span className='s-r-s sdetail'>{status}</span>
                    </div>
                    <div className='t-s-d sdetail'>
                        <spans className="t-s-t detail"> Description</spans>
                        {description ? (
                            <div className='t-s-d-c sdetail'><p className='d-p sdetail'>{description}</p></div>

                        ) : (
                            "No description"
                        )}
                    </div>
                    <div className='s-owner-info sdetail'>
                        <span className='s-o-logo sdetail'> <img className='s-o-i sdetail' src={userLogo} style={{ height: '30px', width: '30px', borderRadius: '50%', backgroundColor: taskOwnerObj?.avatar_color }} /> </span>
                        <span className='s-o-name sdetail'>{taskOwnerObj?.firstName} {taskOwnerObj?.lastName} created this task</span>
                    </div>
                </div>

            )}

        </div>)
}




export default TaskSideDetail
