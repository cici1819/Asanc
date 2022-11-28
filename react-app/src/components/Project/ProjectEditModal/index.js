import React from 'react';
import { Modal } from '../../../context/Modal';
import ProjectEdit from './ProjectEditForm';


function ProjectEditModal({showProjectEditModal, setShowProjectEditModal}) {

    return (
        <>

                {showProjectEditModal && (
                    <Modal onClose={() => setShowProjectEditModal(false)}>
                        <ProjectEdit setShowProjectEditModal={setShowProjectEditModal} />
                    </Modal>
                )}

        </>
    );
}


export default ProjectEditModal;
