import React, { useState } from "react";
import ProjectEditModal from "../Project/ProjectEditModal";
import ProjectDeleteModal from "../Project/ProjectDeleteModal";
import ProjectSetting from "../Project/ProjectSetting/ProjectSettingSelect";
import SideBar from "../SideBar/SideBar";
import CurrentProjectUserInfo from "../Project/UsersInOneProject";
function MainPage({ show }) {
    const [showProjectEditModal, setShowProjectEditModal] = useState(false)
    const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);


    return (
        <>
            <div className="home-page-sideBar">
                <SideBar show={show} />
            </div>
            <div className="mainPage-project-setting">
                <ProjectSetting setShowProjectEditModal={setShowProjectEditModal}
                    setShowProjectDeleteModal={setShowProjectDeleteModal}
                />

                <ProjectEditModal showProjectEditModal={showProjectEditModal}
                    setShowProjectEditModal={setShowProjectEditModal}
                />
                <ProjectDeleteModal showProjectDeleteModal={showProjectDeleteModal}
                    setShowProjectDeleteModal={setShowProjectDeleteModal}
                />
            </div>
            <div className="main-page-currentProjectUser">
                <CurrentProjectUserInfo />
            </div>
        </>

    )

}

export default MainPage
