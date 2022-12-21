
import React from "react";
import './TaskInSection.css'
import SingleTask from "../TaskDetail";

function TaskInSection({ section, project,sessionUser }) {

    const users = project?.users
    const tasksArr = section?.tasks
    const projectId = project?.id
    if (!section) return null
    return (
        <>
            {tasksArr.map((task) => (
                <div key={task.id}>
                    <SingleTask task={task} users={users} section={section} sessionUser={sessionUser} projectId={projectId} />
                </div>
            ))}
        </>

    )

}

export default TaskInSection
