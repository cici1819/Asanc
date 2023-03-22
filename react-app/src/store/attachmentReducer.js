
const ADD_ATTACHMENT_TO_TASK = 'attachments/ADD_ATTACHMENT_TO_TASK'
const LOAD_ATTACHMENTS = 'attachments/LOAD_ATTACHMENTS'
const EDIT_ATTACHMENT = 'attachments/EDIT_ATTACHMENT '
const DELETE_ATTACHMENT = 'attachments/DELETE_ATTACHMENT'

export const addAttchmentToTask = (attachment) => {
    return {
        type: ADD_ATTACHMENT_TO_TASK,
        attachment
    };
};

export const loadAttachments = (attachments) => {
    return {
        type: LOAD_ATTACHMENTS,
        attachments,

    }
}

export const editOneAttachment = (attachment) => {
    return {
        type: EDIT_ATTACHMENT,
        attachment
    };
};

export const deleteOneAttachment = (attachmentId) => {
    return {
        type: DELETE_ATTACHMENT,
        attachmentId
    };
};

//Thunk

export const thunkAttachemntDownload = (attachmentId) => async () => {
    const res = await fetch(`/api/attachments/${attachmentId}/download`);
    if (res.ok) {
        const data = await res.json();
        return data;
    }
};

export const thunkLoadAttachments = (taskId) => async (dispatch) => {
    const res = await fetch(`/api/attachments/${taskId}`);
    if (res.ok) {
        const attachments = await res.json();
        dispatch(loadAttachments(attachments));
        return attachments;
    }
};


export const thunkAddAttachmentToTask = (data) => async (dispatch) => {
    // console.log("running^^^^^^^^^^ createOneComment thunk")
    const { taskId, attachment,name } = data
    const formData = new FormData();
    // formData.append("ownerId", ownerId);
    formData.append("taskId", taskId);
    formData.append("name", name);
    // formData.append("private", priv);
    formData.append("attachment", attachment);
    const response = await fetch("/api/attachments/new", {
        method: "POST",
        body: formData,
    });
    if (response.ok) {
        const attachment = await response.json();
        dispatch(addAttchmentToTask(attachment));
        return attachment;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};


export const thunkUpdatedAttachment = (data) => async (dispatch) => {
    const { taskId,attachmentId,newAttachment,name } = data;
    // console.log(`........thunkUpdatedAttachment....: ${sectionTitle}`);
    const formData = new FormData();
    formData.append("taskId", taskId);
    // formData.append("private", priv);
    formData.append("name",name)
    formData.append("attachment", newAttachment);
    const response = await fetch(`/api/attachments/${attachmentId}`, {
        method: "PUT",
        body: formData,
    });
    if (response.ok) {
        const attachment = await response.json();
        dispatch(editOneAttachment(attachment));
        return attachment;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const thunkDeleteAttachment = (attachmentId) => async (dispatch) => {
    // console.log("@@@@@@@@@@@@@@@@@@Delete thunk", attachmentId)
    const response = await fetch(`/api/attachments/${attachmentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {

        dispatch(deleteOneAttachment(attachmentId));
    }
}


//reducer

const attachmentReducer = (state = {}, action) => {
    let newState
    switch (action.type) {
        case LOAD_ATTACHMENTS:
            return { ...state, ...newState, attachments: [...action.attachments.attachments] };

        case ADD_ATTACHMENT_TO_TASK:
            newState = {...state}
            newState.attachments[action.attachment.id]= action.attachment
            // newState.attachments.push(action.attachment);
            return newState;

        case EDIT_ATTACHMENT:
            // console.log('action!!!!!!!!!!!!', action.section)
            return { ...state, [action.attachment.id]: { ...state[action.attachment.id], ...action.attachment } }

        case DELETE_ATTACHMENT:
             newState = { ...state }
            // console.log('!!!action', action)
            delete newState[action.attachmentId]

            // console.log("newState________",newState)
            return newState

        default:
            return state;
    }
}

export default attachmentReducer;
