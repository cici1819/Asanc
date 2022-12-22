import React, { useState, useEffect } from "react";
import ProjectEditModal from "../Project/ProjectEditModal";
import ProjectDeleteModal from "../Project/ProjectDeleteModal";
import ProjectSetting from "../Project/ProjectSetting/ProjectSettingSelect";
import SideBar from "../SideBar/SideBar";
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProject } from "../../store/projectReducer";
import CurrentProjectUserInfo from "../Project/UsersInOneProject";
import SectionListInProject from "../Section/SectionListInProject";
import './MainPage.css'
function MainPage({ show, toggle }) {
    const [showProjectEditModal, setShowProjectEditModal] = useState(false)
    const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.projects.singleProject)
    const mainPageCalss = show ? "mainPage-open" :"mainPage-closed"
    useEffect(() => {
        dispatch(getOneProject(projectId))
    }, [dispatch, projectId]);

    return (<>
        <div className="home-page-sideBar">
            <SideBar show={show} toggle={toggle} />
        </div>
        <div className={mainPageCalss}>
            <div className="main-page-content">

                <div className="mainPage-project-setting">
                    <ProjectSetting setShowProjectEditModal={setShowProjectEditModal}
                        setShowProjectDeleteModal={setShowProjectDeleteModal} currentProject={currentProject}
                    />

                    <ProjectEditModal showProjectEditModal={showProjectEditModal}
                        setShowProjectEditModal={setShowProjectEditModal} currentProject={currentProject}
                    />
                    <ProjectDeleteModal showProjectDeleteModal={showProjectDeleteModal}
                        setShowProjectDeleteModal={setShowProjectDeleteModal} currentProject={currentProject}
                    />
                </div>
                <div className="main-page-currentProjectUser">
                    <CurrentProjectUserInfo />
                </div>
                <div className="mian-page-sectionList">
                    <SectionListInProject />
                </div>
            </div>

        </div>
    </>


    )

}

export default MainPage
