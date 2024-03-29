import React, { useState, useEffect } from "react";
import ProjectEditModal from "../Project/ProjectEditModal";
import ProjectDeleteModal from "../Project/ProjectDeleteModal";
import ProjectSetting from "../Project/ProjectSetting/ProjectSettingSelect";
import SideBar from "../SideBar/SideBar";
import { useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProject } from "../../store/projectReducer";
import CurrentProjectUserInfo from "../Project/UsersInOneProject";
import SectionListInProject from "../Section/SectionListInProject";
import  FourOhFourPage from '../404Page/index';
import './MainPage.css'
function MainPage({ show, toggle }) {
    const [showProjectEditModal, setShowProjectEditModal] = useState(false)
    const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
    const { projectId } = useParams();
    const dispatch = useDispatch();
    const currentProject = useSelector(state => state.projects.singleProject)
    const sessionUser = useSelector(state => state.session.user);
    const mainPageClass = show ? "mainPage-open" : "mainPage-closed"
    const mainPageTableClass = show ? "task-table-title" : "task-table-title-closed"
    const sectionListClass = show ? "mian-page-sectionList":"main-page-sectionList-closed"
    useEffect(() => {
        dispatch(getOneProject(projectId))
    }, [dispatch, projectId]);
    const existedUser = currentProject?.users?.some(el=>el.id===sessionUser.id)
    if (currentProject && !existedUser) {
      return( <FourOhFourPage />)
    }

    return (<>
        <div className="home-page-sideBar">
            <SideBar show={show} toggle={toggle} />
        </div>
        <div className={mainPageClass}>
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
                <div className={mainPageTableClass}>
                    <div className="t-t-name">
                        Task name
                    </div>
                    <div className="t-t-assignee">
                        Assignee
                    </div>
                    <div className="t-t-dueDate">
                        Due date
                    </div>
                    <div className="t-t-priority">
                        Priority
                    </div>
                    <div className="t-t-status">
                        Status
                    </div>

                </div>
                <div className={sectionListClass}>
                    <SectionListInProject show={show} />
                </div>
            </div>

        </div>
    </>


    )

}

export default MainPage
