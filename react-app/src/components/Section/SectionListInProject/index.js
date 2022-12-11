import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
import { getOneProject } from "../../../store/projectReducer"
import TaskInSection from "../../Task/TaskInSection";
import './SectionListInProject.css'
import SectionSetting from "../SingleSection";
import SectionCreate from "../SectionCreate";


function SectionListInProject() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const project = useSelector(state => state.projects?.singleProject);
    // const [newSection, setNewSection] = useState("")


    // const handleSectionAdd = (e) => {
    //     e.preventDefault();
    //     dispatch(addSectionToProject(projectId, newSection));
    //     setNewSection("");
    // }

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
            <div>
                {sectionArr.length > 0 && sectionArr.map((section) => (
                    <div className="single-section-in-project" key={section.id}>
                        <div className="single-section-in-project-left">
                            <div className="single-section-in-project-title">
                                <SectionSetting title={section.title} sessionUserIsOwner={sessionUserIsOwner} section={section} project={project}
                                />


                                <TaskInSection section={section} project={project} sessionUser={sessionUser} />

                            </div>
                        </div>

                    </div>



                ))}

            </div >
            <div>
                <SectionCreate projectId={projectId} project={project} sessionUserIsOwner={sessionUserIsOwner}/>
            </div>

        </div >
    )
}




export default SectionListInProject;
