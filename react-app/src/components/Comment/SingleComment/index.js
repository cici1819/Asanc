import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from "../../../store/commentReducer"
import { thunkGetOneTask } from "../../../store/taskReducer"
import TextareaAutosize from "react-textarea-autosize";
import userLogo from "../../../img/user-logo.png"
import "./SingleComment.css"
const SingleComment = ({ commentId, comment, users,show }) => {
    const dispatch = useDispatch();
    const [content, setContet] = useState(comment?.content);
    const [errors, setErrors] = useState([]);
    const task = useSelector(state => state.tasks?.singleTask);
    const comments = useSelector(state => state?.comments?.comments)
    const sessionUser = useSelector((state) => state.session.user);
    const ref = useRef(null)
    let taskId = task.id
    const commentOwnerObj = users?.find(user => user?.id == comment?.ownerId)
    const commentClass = show ? "comment-edit-input" : "comment-edit-input-closed"
    const deleteCommentClass = show ? "comment-delete-icon" :"commen-delete-icon-closed"
    useEffect(() => {
        const errors = [];
        if (content.length > 3000 || content.length < 3) {
            errors.push("Content must be between 3 and 3000 characters")
        }
        setErrors(errors);
    }, [content])

    const handleInputBlur = async (e) => {
        e.preventDefault();
        // console.log(`current input value...... ${e.target.value}`);
        const payload = {
           content, taskId,  commentId
        };
        const editedComment = dispatch(commentActions.thunkUpdatedComment(payload))
        if (editedComment) {
            await dispatch(commentActions.thunkLoadOneComment(commentId))
        }
    }



    const deleteComment = async (e) => {
        await dispatch(commentActions.thunkDeleteComment(commentId));
        await dispatch(commentActions.thunkLoadTaskComments(taskId));
        // await dispatch(c(taskId))
        await dispatch(thunkGetOneTask(taskId))
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.target.blur();

        }
    }
    // useEffect(() => {

    //     dispatch(commentActions.thunkLoadTaskComments(taskId))

    // }, [dispatch, taskId,comment,comments]);

    const handleChange = (e) => {
        e.preventDefault();
        setContet(e.target.value);

    }


    let sessionUserIsOwner = false
    if (comment) {

        sessionUserIsOwner = comment.ownerId == sessionUser.id

    }
    ////////////////////////////////////////////////////////

    return (
        <>


            {errors.length > 0 && (<div className='comment-error-list'>

                {errors[0]}

            </div>)}
            <div className='comment-owner-info ref'>
                <span className='c-o-logo ref'> <img className='c-o-i ref' src={userLogo} style={{ height: '25px', width: '25px', borderRadius: '50%', backgroundColor: commentOwnerObj?.avatar_color }} /> </span>
                <span className='c-o-name ref'>{commentOwnerObj?.firstName} {commentOwnerObj?.lastName}</span>
                <span className="comment-date">{comment?.updated_at.substring(0, 16)}</span>
            </div>
            {sessionUserIsOwner ?
                (<>
                    <div className={`ref ${commentClass}`}>
                        <TextareaAutosize
                            type='text'
                            value={content}
                            placeholder="Leave a comment"
                            onBlur={handleInputBlur}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            ref={ref}
                            id='comment-part-input'

                        />

                    </div>

                    <div className={`${deleteCommentClass} ref`}
                        onClick={deleteComment}>
                        <i className="fa-sharp fa-solid fa-circle-xmark ref"></i>
                        <span className='ref comment-delete' id="d-c-span">Delete comment</span>

                    </div>
                </>


                )
                : (
                    <>
                        <div className='read-comment-input'>
                            <TextareaAutosize
                                type='text'
                                value={content}
                                onChange={(e) => handleChange(e)}
                                readOnly
                            />

                        </div>


                    </>


                )}


        </>
    )
}

export default SingleComment
