import React, { useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import CurrentUserProject from "../Project/CurrentUserProject";
import ProjectCreateModal from "../Project/ProjectCreateModal";
import ProjectEditModal from "../Project/ProjectEditModal";
import ProjectDeleteModal from "../Project/ProjectDeleteModal";
import ProjectSetting from "../Project/ProjectSetting/ProjectSettingSelect";
import { useHistory } from "react-router-dom";
import logo from "../../img/asanc-logo.jpg"

function MainPage(props) {
    const [showProjectEditModal, setShowProjectEditModal] = useState(false)
    const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false);
    const history = useHistory();


    return (
        <div className="home-page-container">

           












        </div>















    )



















}
