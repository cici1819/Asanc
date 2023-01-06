const LOAD_SIDEBARCURRENT = 'sideBarProjects/LOAD_SIDEBARCURRENT'


const loadSideBarProjects = (projects) => ({
    type: LOAD_SIDEBARCURRENT,
    projects
})



export const getSideBarProjects = () => async (dispatch) => {
    console.log("running*******sideBarProjectsThunk")
    const response = await fetch('/api/projects/current');
    if (response.ok) {
        const projects = await response.json();
        console.log("current sideBar projects Thunk", projects)
        dispatch(loadSideBarProjects(projects))
        return projects
    }
}

const sideBarReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SIDEBARCURRENT:
            newState = {};
            action.projects.Projects.forEach(project => {
                newState[project.id] = project;
            });
            // console.log('ALL Projects REDUCED', allprojects)
            // newState.allProjects = allProjects;
            // newState.singleProject = {};
            return newState;
        default:
             return state;
    }

}
export default sideBarReducer
