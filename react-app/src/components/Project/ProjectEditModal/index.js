import React from 'react';
import { Modal } from '../../../context/Modal';
import ProjectEdit from './ProjectEditForm';


function ProjectEditModal({showProjectEditModal, setShowProjectEditModal,currentProject}) {

    return (
        <>

                {showProjectEditModal && (
                    <Modal onClose={() => setShowProjectEditModal(false)}>
                        <ProjectEdit setShowProjectEditModal={setShowProjectEditModal} currentProject={currentProject}/>
                    </Modal>
                )}

        </>
    );
}


export default ProjectEditModal;
