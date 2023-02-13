import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetOneTask } from "../../../store/taskReducer";
// import { useHistory } from "react-router-dom";
import * as attachmentAction from '../../../store/attachmentReducer';
import userLogo from "../../../img/user-logo.png"
import AttachmentDownLoad from "../attachmentDownload";
import './AttachmentUpload.css';

const UploadAttachment = ({ users, taskId }) => {
    const dispatch = useDispatch();
    const [attachment, setAttachment] = useState(null);
    const [name, setName] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [urlErrors, setUrlErrors] = useState([]);
    // const task = useSelector(state => state.tasks?.singleTask);
    const [showAttachmentsErrors, setShowAttachmentsErrors] = useState(false);
    // const attachments = task?.attachments;
    const attachments = useSelector(state => state?.attachments.attachments)
    const attachmentArr = Object.values(attachments)
    console.log("images----------", attachments)
    console.log("ARRAY~~~~~~~~~~~~",attachmentArr)
    const errors = []

    const attachmentOwnerObj = users?.find(user => user?.id == attachment?.ownerId)

    useEffect(() => {
        dispatch(thunkGetOneTask(taskId))

    }, [dispatch, taskId]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setUrlErrors([]);
        if (attachments && attachmentArr?.length >= 5) {
            setShowAttachmentsErrors(true);
            errors.push('Maximum 5 attachments allowed.')
            setUrlErrors(errors);
            // console.log("urlerrors==============", urlValidationErrors)
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
            const data = { taskId, attachment, name };
            const newAttachment = await dispatch(
                attachmentAction.thunkAddAttachmentToTask(data)
            );
            if (newAttachment) {
                setUrlErrors(newAttachment?.errors);
                setImageLoading(false);
                setName("")
                setAttachment(null)
                await dispatch(attachmentAction.thunkLoadAttachments(taskId))
            }
        }
    }

    const handleNameChange = async (e) => {
        const name = e.target.value
        setName(name)
    }

    const updateAttachment = (e) => {
        const attachment = e.target.files[0];
        if (attachment) {
            if (attachment.size / 1000000 <= 10) setAttachment(attachment);
            else {
                e.target.value = "";
                alert("attachment size must be 10MB or less.");
                return false;
            }
        }
    };
    // const handleAttachmentDelete = async (attachmentId) => {
    //     if (window.confirm('Do you want to delete this attachment?')) {
    //         await dispatch(attachmentAction.thunkDeleteAttachment(attachmentId))
    //         setUrlErrors([]);
    //     }
    // }
    if (!attachmentArr.length && !attachments) {
        return (
            <>
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
                <button onClick={handleSubmit}>Upload Attachment</button>
                {(imageLoading) && <p>Loading...</p>}
            </div>

        </>
           )
    }
return (
    <div>
        <div className="attachment-errors">
            {showAttachmentsErrors && urlErrors.map((error, idx) => (
                <li key={idx} className='form-errors'>{error}</li>
            ))}
        </div>
        <div className="attachment-container">
            {attachmentArr.length && attachmentArr.map((attachment) =>
                <div key={attachment.id} className="attachment-delete">
                    <span className='a-o-logo ref'> <img className='a-o-i ref' src={userLogo} style={{ height: '20px', width: '20px', borderRadius: '50%', backgroundColor: attachmentOwnerObj?.avatar_color }} /> </span>
                    <span className='a-o-name ref'>{attachmentOwnerObj?.firstName} {attachmentOwnerObj?.lastName}</span>
                    <div className="attachment-date">{attachment?.updated_at.substring(0, 10)}</div>
                    <div>{attachment?.name} : </div>
                    <AttachmentDownLoad attachment={attachment} taskId={taskId} />
                    {/* <button onClick={() => handleAttachmentDelete(attachment.id)}>x</button> */}
                </div>
            )}
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
            <button onClick={handleSubmit}>Upload Attachment</button>
            {(imageLoading) && <p>Loading...</p>}
        </div>
    </div>
)
}

export default UploadAttachment;
