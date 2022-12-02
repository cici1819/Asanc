import React, { useState } from "react";
import CurrentUserProject from "../Project/CurrentUserProject";
import ProjectCreateModal from "../Project/ProjectCreateModal";

import { useHistory } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import projectlogo from "../../img/project-icon.png"

function HomePage({show}) {

    return (
        <div className="home-page-container">

            <div className="home-page-sideBar">
                <SideBar show = {show} />
            </div>

            <div>
                <CurrentUserProject />

            </div>
            <div className="home-page-projectcreateModal">
              <ProjectCreateModal />
            </div>

        </div>















    )



















}


export default HomePage
