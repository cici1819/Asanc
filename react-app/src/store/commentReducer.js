
const ADD_COMMENT_TO_TASK = 'comments/ADD_COMMENT_TO_TASK'
const LOAD_ONE_COMMENT = 'comments/LOAD_ONE_COMMENT'
const LOAD_TASK_COMMENTS = 'comments/LOAD_TASK_COMMENTS'
const EDIT_COMMENT = 'comments/EDIT_COMMENT '
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

export const addCommentToTask = (comment) => {
    return {
        type: ADD_COMMENT_TO_TASK,
        comment
    };
};

export const loadOneComment = (comment) => {
    return {
        type: LOAD_ONE_COMMENT,
        comment
    }
}

export const loadTaskComments = (comments) => {
    return {
        type: LOAD_TASK_COMMENTS,
        comments
    }
}

export const editOneComment = (comment) => {
    return {
        type: EDIT_COMMENT,
        comment
    };
};

export const deleteOneComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    };
};

//Thunk

export const thunkAddCommentToTask = (data) => async (dispatch) => {
    // console.log("running^^^^^^^^^^ createOneComment thunk")
    const { taskId, content } = data
    const response = await fetch(`/api/comments/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, content }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        const newComment = await response.json();
        dispatch(addCommentToTask(newComment))
        // console.log('newComment!!!!!!', newComment)
        return newComment
    }
}

export const thunkLoadOneComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`)
    if (response.ok) {
        const comment = await response.json();
        dispatch(loadOneComment(comment))
        return comment
    }
}


export const thunkLoadTaskComments = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${taskId}`)
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadTaskComments(comments))
        return comments
    }
}

export const thunkUpdatedComment = (data) => async (dispatch) => {
    const { commentId, taskId, content } = data;
    // console.log(`........printing sectionTitle input....: ${sectionTitle}`);
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content }),
    })
    if (response.ok) {
        const editedComment = await response.json();
        //console.log('comment!!!!!!!!!!!!', editedComment)
        dispatch(editOneComment(editedComment));
        return editedComment;
    }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {

        dispatch(deleteOneComment(commentId));
    }
}


//reducer

const commentReducer = (state = {}, action) => {
    let newState
    switch (action.type) {

        case LOAD_ONE_COMMENT:
            // console.log("action!!!!!!!!", action)
            let commentState = { ...state }
            // console.log("!!!!!!!!", action.comment)
            commentState[action.comment.id] = action.comment
            // console.log("!!!!!!!!", sectionState)
            return commentState

        case ADD_COMMENT_TO_TASK:
            // console.log('!!!action', action)
            return { ...state, [action.comment.id]: { ...action.comment } };

        case LOAD_TASK_COMMENTS:
            // newState = {}
            // console.log("task-comment####### running")
            // action.comments.Comments.forEach(comment => {
            //     newState[comment.id] = comment
            // })
            // console.log("newState................", newState)
            // return newState
            return { ...state, ...newState, comments: [...action.comments] };

        case EDIT_COMMENT:
            // console.log('action!!!!!!!!!!!!', action.section)
            return { ...state, [action.comment.id]: { ...state[action.comment.id], ...action.comment } }

        case DELETE_COMMENT:
            newState = { ...state }
            // console.log('!!!action', action)
            delete newState[action.commentId]

            // console.log("newState________",newState)
            return newState

        default:
            return state;
    }
}


export default commentReducer;
