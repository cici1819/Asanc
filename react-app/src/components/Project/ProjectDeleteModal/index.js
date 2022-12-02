import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import ProjectDelete from './ProjectDeleteForm';

function ProjectDeleteModal({ project, showProjectDeleteModal, setShowProjectDeleteModal }) {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>

            {showProjectDeleteModal && (
                <Modal onClose={() => setShowProjectDeleteModal(false)}>
                    <ProjectDelete setShowProjectDeleteModal={setShowProjectDeleteModal} project={project} />
                </Modal>
            )}

        </>
    );
}


export default ProjectDeleteModal;
