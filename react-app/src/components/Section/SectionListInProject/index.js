import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { getOneProject } from "../../../store/projectReducer"
import './SectionListInProject.css'
import SingleSection from "../SingleSection";
import SectionCreate from "../SectionCreate";


function SectionListInProject({ show }) {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const project = useSelector(state => state.projects?.singleProject);
    const ref = useRef (null)

    useEffect(() => {
        dispatch(getOneProject(projectId))

    }, [dispatch, projectId]);


    let sectionArr = project?.sections;




     const [sectionList, setSectionList] = useState([]);
     const onAddBtnClick = event => {
      setSectionList(sectionList.concat(
        <div className="section-create-div">
        <SectionCreate  projectId={projectId} project={project} setSectionList={setSectionList} />
    </div >));
    };
    //  sectionArr= sectionArr.push(sectionList)




    if (!sectionArr) { return null }

    let sessionUserIsOwner = false
    if (project) {
        // console.log("current SERVER ",currentServer)
        sessionUserIsOwner = project.owner_id == sessionUser.id
        // console.log("owned by you?", sessionUserIsOwner)
    }

    return (
        <div className="section-in-project-container">
            <div className="section-part">
                {sectionArr.length > 0 && sectionArr.map((section) => (
                    <div className="single-section-in-project" key={section.id}>
                        <div className="single-section-in-project-left">
                            <div className="single-section-in-project-title">
                                <SingleSection title={section.title} sessionUserIsOwner={sessionUserIsOwner} section={section} project={project} sessionUser={sessionUser}
                                    show={show} />
                            </div>
                        </div>
                    </div>
                ))}

            </div >
            {/* <div className="section-create-div">
                {sessionUserIsOwner && <SectionCreate projectId={projectId} project={project} />}
            </div> */}
            
            <div className="section-list-new">{sectionList}</div>


            {sessionUserIsOwner && <div onClick={onAddBtnClick} className="addSection-main-container"><i className="fa-solid fa-plus" id="create-phase-plus"></i>
                <span> Add section</span></div>}

        </div >
    )
}




export default SectionListInProject;
