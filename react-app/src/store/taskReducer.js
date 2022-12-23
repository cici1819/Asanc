const LOAD_ONE_TASK = 'tasks/LOAD_ONE_TASK'
const CREATE_TASK_IN_SECTION = 'tasks/CREATE_TASK_IN_SECTION';
const UPDATE_TASK = 'tasks/UPDATE_TASK';
const DELETE_TASK = 'tasks/DELETE_TASK';
const LOAD_USER_TASK = 'tasks/LOAD_USER_TASK'




export const loadOneTask = (task) => {
    return {
        type: LOAD_ONE_TASK,
        task
    }
}

export const createOneTask = (task) => {
    return {
        type: CREATE_TASK_IN_SECTION,
        task
    }
}

export const updateOneTask = (task) => {
    return {
        type: UPDATE_TASK,
        task

    }
}

export const removeOneTask = (taskId) => {
    return {
        type: DELETE_TASK,
        taskId

    }
}

export const getUserTasks = (tasks) => {
    return {
        type: LOAD_USER_TASK,
        tasks
    }
}


// export const completedTask = (taskId) => {
//     return {
//         type: COMPLETED_TASK,
//         taskId
//     }
// }

//Thunk

export const thunkGetCurrUserTasks = () => async (dispatch) => {
    const response = await fetch('/api/tasks/current');

    if (response.ok) {
        const tasks = await response.json();
        dispatch(getUserTasks(tasks));
        return tasks;
    }
}

export const thunkGetOneTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`)

    if (response.ok) {
        const task = await response.json()
        dispatch(loadOneTask(task))
        return task
    }
}


export const thunkCreateTask = (data) => async (dispatch) => {
    console.log("CREATE TASKS THUNK:", data)
    const { title, description, assigneeId, ownerId, sectionId, status, priority, projectId, end_date: dueDate, completed } = data

    try {
        const response = await fetch(`/api/tasks/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, assigneeId, ownerId, sectionId, status, priority, projectId, end_date: dueDate, completed })
        })
        console.log("CREATE TASK THUNK RESPONSE", response)
        if (response.ok) {
            const newTask = await response.json();
            dispatch(createOneTask(newTask));
            return newTask
        }

    } catch (error) {
        throw error
    }
}

export const thunkUpdateTask = (data) => async (dispatch) => {
    const { title, description, assigneeId, sectionId, status, priority, projectId, end_date: dueDate, completed, taskId } = data
    console.log("thunkUpdateTask'''''''''", data)
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, assigneeId, sectionId, status, priority, projectId, end_date: dueDate, completed })

        });

        console.log("thunkupdateResponse",response)
        if (response.ok) {
            const updatedTask = await response.json();
            dispatch(updateOneTask(updatedTask));
            console.log("QQQQQQQQQQQQQ", updatedTask)
            return updatedTask
        }

    } catch (error) {
        throw error
    }
}

export const thunkDeleteTask = (taskId) => async (dispatch) => {
    console.log("DELETE Task THUNK running:", taskId)
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
    })
    console.log("DELETE TASKS Response:", response)
    if (response.ok) {
        dispatch(removeOneTask(taskId));
        return response
    }
}

export const toggleCompleteTask = (taskId) => async () => {
    const response = await fetch(`/api/tasks/${taskId}/complete`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        return response.json();
    } else {
        return response;
    }
};








const initialState = {
    allTasks: {},
    singleTask: {}
}

const tasks = (state = initialState, action) => {
    let newState;
    let allTasks = {};
    switch (action.type) {

        case LOAD_USER_TASK:
            newState = {}
            action.tasks.Tasks.forEach(task => {
                allTasks[task.id] = task
            })
            newState.allTasks = allTasks;
            newState.singleTask = {};
            return newState;

        case LOAD_ONE_TASK:
            newState = { ...state }
            newState.singleTask = action.task
            return newState

        case CREATE_TASK_IN_SECTION:
            newState = { ...state }
            newState.singleTask = { ...state.singleTask, ...action.task }
            newState.allTasks = { ...state.allTasks, [action.task.id]: action.task }
            console.log("#############create reduer", action)
            console.log("newState@@@@@@@@@@@@", newState)
            return newState

        case UPDATE_TASK:
            newState = { ...state }
            newState.singleTask = { ...state.singleTask, ...action.task }
            newState.allTasks = { ...state.allTasks, [action.task.id]: action.task }
            // newState.allTasks = { ...state.allTasks }
            return newState

        case DELETE_TASK:
            newState = { ...state }
            delete newState.allTasks[action.taskId]
            newState.singleTask = {}
            return newState

        default:
            return state;
    }
}

export default tasks;
