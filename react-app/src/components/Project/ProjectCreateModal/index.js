import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import ProjectCreate from './ProjectCreateForm';


function ProjectCreateModal() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='add-project'  >
                <span className=''>
                    <i className="fa-regular fa-plus" id="create-server-plus" onClick={()=>setShowModal(true)} > </i>
                </span>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <ProjectCreate setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}


export default ProjectCreateModal;
