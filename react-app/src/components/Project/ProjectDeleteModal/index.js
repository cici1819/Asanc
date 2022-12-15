import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import ProjectDelete from './ProjectDeleteForm';

function ProjectDeleteModal({ currentProject, showProjectDeleteModal, setShowProjectDeleteModal }) {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>

            {showProjectDeleteModal && (
                <Modal onClose={() => setShowProjectDeleteModal(false)}>
                    <ProjectDelete setShowProjectDeleteModal={setShowProjectDeleteModal} currentProject={currentProject} />
                </Modal>
            )}

        </>
    );
}


export default ProjectDeleteModal;
