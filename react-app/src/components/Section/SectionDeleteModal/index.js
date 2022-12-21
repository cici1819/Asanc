import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import { useSelector } from 'react-redux';
import SectionDelete from './SectionDeleteForm';

function SectionDeleteModal({ section, showSectionDeleteModal, setShowSectionDeleteModal, sessionUserIsOwner, project }) {
    // const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) {
        return null;
    }

    return (
        <>

            {showSectionDeleteModal && (
                <Modal onClose={() => setShowSectionDeleteModal(false)}>

                    <SectionDelete setShowSectionDeleteModal={setShowSectionDeleteModal} section={section} sessionUserIsOwner={sessionUserIsOwner} project={project} />
                </Modal>
            )}

        </>
    );
}


export default SectionDeleteModal;
