import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetOneTask } from '../../../store/taskReducer'
import * as attachmentAction from '../../../store/attachmentReducer';
// import AttachmentEditModal from "../attachmentEdit";


const AttachmentDownLoad = ({attachment, taskId}) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const attachmentId = attachment.id
    // console.log("!!!!!!!!!!!!!AttachmentId", attachmentId)
    const attachments = useSelector(state => state?.attachments.attachments)

    useEffect(() => {
        dispatch(thunkGetOneTask(taskId))
    }, [dispatch, taskId,attachments]);

    const deleteAttachment = async () => {
        if (window.confirm('Do you want to delete this attachment?')) {
            await dispatch(attachmentAction.thunkDeleteAttachment(attachmentId))
            await dispatch(attachmentAction.thunkLoadAttachments(taskId))

        }
    }
    // const downloadAttachment= async (attachmentId) => {
    //     const loadAttachment = await dispatch(attachmentAction.thunkAttachemntDownload(attachmentId));
    //     return loadAttachment
    //   };

    let sessionUserIsOwner = false
    if (attachment) {
        sessionUserIsOwner = attachment.ownerId == sessionUser.id
    }

    return (
        <div className="setting-attachment">
            {sessionUserIsOwner && (
                <>
                    <div className="delete-attachment" onClick={deleteAttachment}>
                        <div className="delete-icon">
                            <i class="fa-solid fa-trash dropDownIcon leftPad"></i>
                            <div className="delete-title">Delete</div>
                        </div>
                    </div>
                    {/* <button onClick={(e) => editFile(file.id)}>Edit</button> */}
                    {/* <AttachmentEditModal attachment={attachment} attachmentId={attachmentId} taskId={taskId} attachments={attachments} /> */}
                </>
            )}

            <button className="dropDownButton">
                <div className="flexRow alignCenter">
                <i className="fa-solid fa-download"></i>
                    <div className="dropDownIcon font leftPad">
                        <a href={attachment.url} download>
                            Download
                        </a>
                    </div>
                </div>
            </button>
        </div>
    );
}
export default AttachmentDownLoad;
