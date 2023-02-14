import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetOneTask } from '../../../store/taskReducer'
import * as attachmentAction from '../../../store/attachmentReducer';
import './AttachmentDownload.css';
// import AttachmentEditModal from "../attachmentEdit";


const AttachmentDownLoad = ({ attachment, taskId }) => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const attachmentId = attachment.id
    // console.log("!!!!!!!!!!!!!AttachmentId", attachmentId)
    const attachments = useSelector(state => state?.attachments.attachments)

    useEffect(() => {
        dispatch(thunkGetOneTask(taskId))
    }, [dispatch, taskId, attachments]);

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
        <div className="setting-attachment ref">
            {sessionUserIsOwner && (
                <>
                    <div className="delete-attachment ref" onClick={deleteAttachment}>
                        <span className="delete-icon ref">
                            <i className="fa-solid fa-trash ref"></i>
                        </span>
                        <span className="delete-title ref" id="tip-text">Delete</span>

                    </div>
                    {/* <button onClick={(e) => editFile(file.id)}>Edit</button> */}
                    {/* <AttachmentEditModal attachment={attachment} attachmentId={attachmentId} taskId={taskId} attachments={attachments} /> */}
                </>
            )}

            {/* <button className="dropDownButton ref"> */}
            <div className="download-a-div ref">
                <span className="download-icon ref">
                    <a href={attachment.url} download>
                        <i className="fa-solid fa-download ref"></i>
                    </a>
                </span>
                <span className="download-title ref" id="tip-text">
                    Download
                </span>
            </div>
            {/* </button> */}
        </div>
    );
}
export default AttachmentDownLoad;
