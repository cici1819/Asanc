const ADD_PROJECT = 'projects/ADD_PROJECT'
const LOAD_ONE = "projects/LOAD_ONE"
const LOAD_CURRENT = 'projects/LOAD_CURRENT'
const EDIT_PROJECT = 'projects/EDIT_PROJECT'
const DELETE_PROJECT = 'projects/DELETE_PROJECT'

//action creators

const loadCurrUserProjects = (projects) => ({
    type: LOAD_CURRENT,
    projects
})

const loadOneProject = (project) => ({
    type: LOAD_ONE,
    project
})

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
})

const editProject = (project) => ({
    type: EDIT_PROJECT,
    project
})


const deleteProject = (projectId) => ({
    type: DELETE_PROJECT,
    projectId
})


//Thunk

export const getCurrUserProjects = () => async (dispatch) => {
    console.log("running*******getCurrUserProjectsThunk")
    const response = await fetch('/api/projects/current');
    if (response.ok) {
        const projects = await response.json();
        console.log("current user projects Thunk", projects)
        dispatch(loadCurrUserProjects(projects))
        return projects
    }
}


export const getOneProject = (projectId) => async (dispatch) => {
    console.log("running$$$$$$$$$getOneProjectThunk")
    console.log("Thunk projectId",projectId)
    const response = await fetch(`/api/projects/${projectId}`)
    console.log("get one project thunk response",
    response)
    if (response.ok) {
        const project = await response.json();

        dispatch(loadOneProject(project))
        return project
    }
}


export const createOneProject = (data) => async (dispatch) => {
    console.log("running%%%%%%%%%% createOneProject thunk")
    const { title, icon, description } = data
    try {
        const response = await fetch('/api/projects/new', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, icon, description }),
        })
        if (response.ok) {
            const newProject = await response.json();
            dispatch(addProject(newProject))
            console.log("create one project thunk response", newProject)
            return newProject
        }
    } catch (error) {
        throw error
    }

}


export const editOneProject = (data) => async (dispatch) => {
    const { projectId, title, icon, description } = data;
    console.log("running!!!!!!!!!editOneProject thunk")
    try {
        const response = await fetch(`/api/projects/${projectId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, icon, description }),
        })

        if (response.ok) {
            const editedProject = await response.json();
            dispatch(editProject(editedProject));
            console.log("Edit one project thunk response", editedProject)
            return editedProject
        }
    } catch (error) {
        throw error
    }

}

export const deleteOneProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        dispatch(deleteProject(projectId));
    }
}


// Project Reducer
let initialState = {
    allProjects: {},
    singleProject: {}
}
const projectReducer = (state = initialState, action) => {
    let newState;
    let allProjects = {};
    switch (action.type) {
        case LOAD_CURRENT:
            newState = {};
            action.projects.Projects.forEach(project => {
                allProjects[project.id] = project;
            });
            // console.log('ALL Projects REDUCED', allprojects)
            newState.allProjects = allProjects;
            // newState.singleProject = {};
            return newState;

        case LOAD_ONE:
            newState = { ...state };
            newState.singleProject = action.project
            // console.log("XXXXXXXXXXXXXXXX NewState", newState)
            return newState;

        case ADD_PROJECT:
            newState = { ...state };
            newState.allProjects = { ...state.allProjects, [action.project.id]: action.project };
            newState.singleProject = { ...state.singleProject, ...action.project }
            // console.log("add spot action newState", newState)
            return newState;

        case EDIT_PROJECT:
            newState = { ...state };
            newState.allProjects = { ...state.allProjects, [action.project.id]: action.project };
            newState.singleProject = { ...state.singleProject, ...action.project }
            // console.log("add spot action newState", newState)
            return newState;

        case DELETE_PROJECT:
            newState = { ...state };

            // console.log("delete@@@@@@@@@@@@@@@@22",newState.allProjects)
            delete newState.allProjects[action.projectId]
            // console.log("delete***************,projectId", projectId)
            newState.singleProject = {};
            return newState;

        default:
            return state;

    }
}

export default projectReducer;
