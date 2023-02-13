import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../../store/commentReducer";
import { thunkGetOneTask } from "../../../store/taskReducer";
import TextareaAutosize from "react-textarea-autosize";
import './CommentCreate.css';
import { compareSync } from "bcryptjs";

const CommentCreate = ({ task, setCommentList }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const sessionUser = useSelector((state) => state.session.user);
    // const [timer, setTimer] = useState(null)
    const [errors, setErrors] = useState([]);
    // const taskId = task.id
   let taskId = task.id
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.target.blur();
        }
    };

    useEffect(() => {
        const input = document.getElementsByClassName("add-comment-input")[0];
        input.focus();
    }, [])

    useEffect(() => {
        const errors = [];
        if (content.length > 3000 || content.length < 3 ) {
            errors.push("Content must be between 3 and 3000 characters")
        }
        setErrors(errors);
    }, [content])

    const handleInputBlur = async (e) => {
        e.preventDefault()
        let content = e.target.value;
        console.log("taskid$$$$$$$$$$$$$$$",task.id)
        const payload = {
            content: content, taskId: task.id
        };
        const newComment= dispatch(commentActions.thunkAddCommentToTask(payload))
        if (newComment) {
            await dispatch(thunkGetOneTask(taskId))
            // await dispatch(commentActions.thunkLoadTaskComments(taskId))
        }
        setErrors([])
        setContent("")
        setCommentList([])

    }

    const handleChange = (e) => {
        e.preventDefault();
        setContent(e.target.value)
    }

    return (
        <>
            <div>
                <div >
                    {errors.length > 0 && (<div className="s-detail-content">

                        {errors[0]}

                    </div>)}

                    <TextareaAutosize
                        id="commnet-content"
                        className='add-comment-input ref'
                        type='text'
                        value={content}
                        placeholder="Leave a comment "
                        onBlur={handleInputBlur}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                    />

                </div>
            </div>

        </>
    )


}

export default CommentCreate
