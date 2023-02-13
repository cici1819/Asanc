import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from "../../../store/commentReducer"
import { thunkGetOneTask } from "../../../store/taskReducer"
import TextareaAutosize from "react-textarea-autosize";
import userLogo from "../../../img/user-logo.png"
import "./SingleComment.css"
const SingleComment = ({ commentId, comment, users }) => {
    const dispatch = useDispatch();
    const [content, setContet] = useState(comment?.content);
    const [errors, setErrors] = useState([]);
    const task = useSelector(state => state.tasks?.singleTask);
    const sessionUser = useSelector((state) => state.session.user);
    const ref = useRef(null)
    let taskId = task.id
    const commentOwnerObj = users?.find(user => user?.id == comment?.ownerId)

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
            await dispatch(thunkGetOneTask(taskId))
        }
    }

    const deleteComment = async (e) => {
        await dispatch(commentActions.thunkDeleteComment(commentId));
        await dispatch(thunkGetOneTask(taskId))
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.target.blur();

        }
    }


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
            <div className='c-owner-info ref'>
                <span className='c-o-logo ref'> <img className='c-o-i ref' src={userLogo} style={{ height: '20px', width: '20px', borderRadius: '50%', backgroundColor: commentOwnerObj?.avatar_color }} /> </span>
                <span className='c-o-name ref'>{commentOwnerObj?.firstName} {commentOwnerObj?.lastName}</span>
                <div className="comment-date">{comment?.updated_at.substring(0, 10)}</div>
            </div>
            {sessionUserIsOwner ?
                (<>
                    <div className='comment-part-input'>
                        <TextareaAutosize
                            type='text'
                            value={content}
                            placeholder="Leave a comment"
                            onBlur={handleInputBlur}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            ref={ref}

                        />

                    </div>

                    <div className={`${deleteComment}`}
                        onClick={deleteComment}>
                        <span className='ref comment-delete'>Delete comment</span>
                        <i className="fa-sharp fa-solid fa-circle-xmark"></i>
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
