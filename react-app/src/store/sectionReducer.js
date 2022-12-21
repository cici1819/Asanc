
const ADD_SECTION_TO_PROJECT = 'sections/ADD_SECTION_TO_PROJECT'
const LOAD_ONE_SECTION = 'sections/LOAD_ONE_SECTION'
const EDIT_SECTION = 'sections/EDIT_SECTION '
const DELETE_SECTION = 'sections/DELETE_SECTION'

export const addToSection = (section) => {
    return {
        type: ADD_SECTION_TO_PROJECT,
        section
    };
};

export const loadOneSection = (section) => {
    return {
        type: LOAD_ONE_SECTION,
        section
    }
}

export const editOneSection = (section) => {
    return {
        type: EDIT_SECTION,
        section
    };
};

export const deleteOneSection = (id) => {
    return {
        type: DELETE_SECTION,
        id
    };
};

//Thunk

export const addSectionToProject = (data) => async (dispatch) => {
    console.log("running^^^^^^^^^^ createOneSection thunk")
    const { title ,projectId} = data
    const response = await fetch(`/api/sections/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title,projectId }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        const newSection = await response.json();
        dispatch(addToSection(newSection))
        // console.log('newSection!!!!!!', newSection)
        return newSection
    }
}

export const getOneSection = (sectionId) => async (dispatch) => {
    const response = await fetch(`/api/sections/${sectionId}`)
    if (response.ok) {
        const section = await response.json();
        dispatch(loadOneSection(section))
        return section
    }
}


export const updatedSection = (data) => async (dispatch) => {
    const { sectionId, title, projectId } = data;
    // console.log(`........printing sectionTitle input....: ${sectionTitle}`);
    const response = await fetch(`/api/sections/${sectionId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title }),
    })
    if (response.ok) {
        const editedSection = await response.json();
        console.log('section!!!!!!!!!!!!', editedSection)
        dispatch(editOneSection(editedSection));
        return editedSection;
    }
}

export const deleteSection = (sectionId) => async (dispatch) => {
    const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {

        dispatch(deleteOneSection(sectionId));
    }
}


//reducer

const sectionReducer = (state = {}, action) => {
    switch (action.type) {

        case LOAD_ONE_SECTION:
            console.log("action!!!!!!!!", action)
            let sectionState = { ...state }
            console.log("!!!!!!!!", action.section)
            sectionState[action.section.id] = action.section
            console.log("!!!!!!!!", sectionState)
            return sectionState

        case ADD_SECTION_TO_PROJECT:
            console.log('!!!action', action)
            return { ...state, [action.section.id]: { ...action.section } };

        case EDIT_SECTION:
            console.log('action!!!!!!!!!!!!', action.section)
            return { ...state, [action.section.id]: { ...state[action.section.id], ...action.section } }

        case DELETE_SECTION:
            let newState = { ...state }
            // console.log('!!!action', action)
            delete newState[action.id]
        
            console.log("newState________",newState)
            return newState

        default:
            return state;
    }
}


export default sectionReducer;
