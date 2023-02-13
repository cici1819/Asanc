import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetOneTask } from '../../../store/taskReducer'
import * as attachmentAction from '../../../store/attachmentReducer';
const EditAttachmentForm = ({ attachmentId, attachment, taskId,attachments}) => {

    const dispatch = useDispatch()
    // const sessionUser = useSelector(state => state.session.user);
    const [newAttachment, setNewAttachment] = useState(null);
    const [name, setName] = useState(attachment.name);
    const [imageLoading, setImageLoading] = useState(false);
    const [urlErrors, setUrlErrors] = useState([]);
    //  const task = useSelector(state => state.tasks?.singleTask);
    // const attachments = useSelector(state => state?.attachments.attachments)
    const [showAttachmentsErrors, setShowAttachmentsErrors] = useState(false);
    const errors = []

    // useEffect(() => {
    //     // dispatch(thunkGetOneTask(taskId))
    //     dispatch(attachmentAction.thunkLoadAttachments(taskId))
    // }, [dispatch,taskId]);

    // const attachments = task?.attachments

    const editAttachment = async (e) => {
        e.preventDefault();
        setImageLoading(true);
        //reset errors array
        setUrlErrors([]);
        if (attachments.length >= 5) {
            setShowAttachmentsErrors(true);
            errors.push('Maximum 5 attachments allowed.')
            setUrlErrors(errors);

        }
        else if (!name || name.length > 60) {
            setShowAttachmentsErrors(true);
            errors.push('File Name is required and should less than 60 characters')
            setUrlErrors(errors);
        }
        else {
            setShowAttachmentsErrors(false);
            setImageLoading(true);
            setUrlErrors([]);
            const data = { taskId, attachmentId, newAttachment, name };
            const updatedAttachment = await dispatch(
                attachmentAction.thunkUpdatedAttachment(data)
            );
            if (updatedAttachment) {
                setUrlErrors(updatedAttachment);
                setImageLoading(false);
                setName("")
                setNewAttachment(null)
            }
        }


    };
    const handleNameChange = async (e) => {
        const name = e.target.value
        setName(name)
    }

    const updateAttachment = (e) => {
        const newAttachment = e.target.files[0];
        if (newAttachment) {
            if (newAttachment.size / 1000000 <= 10) setNewAttachment(newAttachment);
            else {
                e.target.value = "";
                alert("attachment size must be 10MB or less.");
                return false;
            }
        }
    };
    return (
        <div>
            <div className="attachment-errors">
                {showAttachmentsErrors && urlErrors.map((error, idx) => (
                    <li key={idx} className='form-errors'>{error}</li>
                ))}
            </div>
            <div className="edit-product-from-upload">
                <label className="font inputsPadding" htmlFor="name">
                    File Name :
                </label>
                <input
                    name="name"
                    type="text"
                    placeholder="File Name"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <input
                    type="file"
                    accept="image/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={updateAttachment}
                    className="upload-button"
                />
                <button onClick={editAttachment}>Save Changes</button>
                {(imageLoading) && <p>Loading...</p>}
            </div>
        </div>

    )



}

export default EditAttachmentForm
