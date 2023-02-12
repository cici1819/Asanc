import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import * as commentActions from "../../../store/commentReducer"
import { thunkGetOneTask } from "../../../store/taskReducer";
import './CommentListInTask.css'
import SingleComment from "../SingleComment";
import CommentCreate from "../commentCreate";


function CommentListInTask({ taskId ,users }) {
    const dispatch = useDispatch();
    // const { projectId } = useParams();
    // const sessionUser = useSelector((state) => state.session.user);
    const task = useSelector(state => state.tasks?.singleTask);
    const ref = useRef(null)

    useEffect(() => {
        dispatch(thunkGetOneTask(taskId))
        // dispatch(commentActions.thunkLoadTaskComments(taskId))
    }, [dispatch, taskId]);


    let commentArr = task?.comments;
    // console.log(commentArr,"$$$$$$$$$$$$$$$$$$$$$$$$$")

    const [commentList, setCommentList] = useState([]);
    const onAddBtnClick = event => {
        setCommentList(commentList.concat(
            <div className="comment-create-div">
                <CommentCreate taskId={taskId} task={task} setCommentList={setCommentList} />
            </div >));
    };


    if (!commentArr) { return null }

    // let taskSettingUser = false
    // if (task) {
    //     if (sessionUser.id == task.ownerId || sessionUser.id == task.assigneeId) {
    //         taskSettingUser = true
    //     }

    // }
    return (
        <div className="comment-in-task-container ref">
            <div className="comment-part ref">
                <span className="title-comment ref">Comments:</span>
                {commentArr.length > 0 && commentArr.map((comment) => (
                    <div className="single-comment-in-task ref" key={comment.id}>
                        <div className="single-comment-in-task-detail ref">
                            <div className="single-comment-in-project-title ref">
                                <SingleComment commentId={comment.id} comment={comment} taskId={taskId} users={users} />
                            </div>
                        </div>
                    </div>
                ))}

            </div >
            {/* <div className="section-create-div">
                {sessionUserIsOwner && <SectionCreate projectId={projectId} project={project} />}
            </div> */}

            <div className="comment-list-new">{commentList}</div>


            <div onClick={onAddBtnClick} className="addComment-main-container ref"><i className="fa-solid fa-plus ref" id="create-phase-plus"></i>
                <span> Add comment</span>
            </div>

        </div >
    )
}
export default CommentListInTask
