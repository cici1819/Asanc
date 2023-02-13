import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditAttachmentForm from "./attachmentForm";

function AttachmentEditModal({attachment,attachmentId,taskId,attachments}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-Button" onClick={() => setShowModal(true)}>
        <div className="edit-icon">
          <i class="fa-solid fa-pen-to-square dropDownIcon leftPad"></i>
          <div className="edit-title">Edit</div>
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
                  <EditAttachmentForm setShowModal={setShowModal} attachment={attachment} attachmentId={attachmentId} taskId={taskId} attachments={attachments} />
        </Modal>
      )}
    </>
  );
}
export default AttachmentEditModal;
