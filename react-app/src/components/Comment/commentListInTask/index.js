import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import * as commentActions from "../../../store/commentReducer"
import { thunkGetOneTask } from "../../../store/taskReducer";
import './CommentListInTask.css'
import SingleComment from "../SingleComment";
import CommentCreate from "../commentCreate";
import { compose } from "redux";


function CommentListInTask({ taskId, users, show }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => state?.comments?.comments)
    // console.log(comments, "++++++++++++++++++++++++++++")
    // console.log("typeof  comments",typeof(comments))
    // const { projectId } = useParams();
    // const sessionUser = useSelector((state) => state.session.user);
    const task = useSelector(state => state.tasks?.singleTask);
    const commentClass = show ? "comment-in-task-container" : "comment-in-task-container-closed"
    const ref = useRef(null)

    useEffect(() => {
        dispatch(thunkGetOneTask(taskId))
        dispatch(commentActions.thunkLoadTaskComments(taskId))
    }, [dispatch, taskId]);


    // let commentArr = task?.comments;
    let commentArr
    if (comments && (comments !== null || comments !== undefined)) {
        commentArr = Object.values(comments)
    }
    // console.log(commentArr,"$$$$$$$$$$$$$$$$$$$$$$$$$")

    const [commentList, setCommentList] = useState([]);
    const onAddBtnClick = event => {
        setCommentList(commentList.concat(
            <div className="comment-create-div ref" id="create-comment2">
                <CommentCreate show={show} task={task} setCommentList={setCommentList} />
            </div >));
    };


    if (!commentArr) { return null }

    return (
        <div className="ref comment-list-task" >
            <div className={`${commentClass} ref`}>
                <div className="comment-c-container ref" id="comment-c-container-r">
                    <span className="title-comment ref">Comments:</span>
                    <span onClick={onAddBtnClick} className="addComment-main-container ref">
                        <i className="fa-solid fa-plus ref" id="create-comment-plus"></i>
                        <span id="c-c-title" className="ref"> Add comment</span>
                    </span>
                </div>


                <div className="comment-list-new ref">{commentList}</div>
                <div className="single-comment-in-task ">
                    {commentArr.length > 0 && commentArr.map((comment) => (
                        <div key={comment.id} className="ref comment-list-div" >
                            <div className="single-comment-in-task-title ref">
                                <SingleComment show={show} commentId={comment.id} comment={comment} users={users} />
                            </div>

                        </div>
                    ))}
                </div>


            </div >

        </div >
    )
}
export default CommentListInTask
