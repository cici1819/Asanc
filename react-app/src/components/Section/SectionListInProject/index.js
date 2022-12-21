import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { getOneProject } from "../../../store/projectReducer"
import './SectionListInProject.css'
import SingleSection from "../SingleSection";
import SectionCreate from "../SectionCreate";


function SectionListInProject() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const project = useSelector(state => state.projects?.singleProject);


    useEffect(() => {
        dispatch(getOneProject(projectId))

    }, [dispatch, projectId]);

    // console.log(`####..project........:  ${project?.section}`)

    let sectionArr = project?.sections;


    // sectionArr.map(s => sectionTitleObj[s.id] = s.title);
    // console.log(`sectionTitleObj........:  ${sectionTitleObj}`)




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
                                />
                            </div>
                        </div>
                    </div>
                ))}

            </div >
            <div className="section-create-div">
                {sessionUserIsOwner && <SectionCreate projectId={projectId} project={project} />}
            </div>

        </div >
    )
}




export default SectionListInProject;
