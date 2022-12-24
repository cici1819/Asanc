import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getOneProject } from "../../../store/projectReducer";
import UserInOneProjectInfo from "./OtherUserProfile";
import './UserInOneProject.css';


function CurrentProjectUserInfo() {
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    // const [UserInOneProject, setUserInOneProject] = useState();
    const allProjects = useSelector(state => state.projects.allProjects)
    console.log("allProjects~~~~~~~~~~", allProjects)
    // = useSelector(state => state.projects.singleProject?.users)
    const singleProject = allProjects[+projectId]

    //  console.log('usersInCurrentProject!!!!!!!!', usersInCurrentProject)
    // console.log("singleProject in CurrentProjectUserInfo$$$$$$$$$$$$", singleProject)

    useEffect(() => {
        dispatch(getOneProject(projectId))
    }, [dispatch, projectId]);


    const users = singleProject?.users
    const otherUsers = users?.filter(user => user.id !== sessionUser.id)
    // console.log("users..............", users)
    // console.log("otherUsers1111111111",otherUsers)

    if (!singleProject) {
        return (<>

        </>)
    }



    if (otherUsers.length===0) {
        return (<>

        </>)
    } else {
        return (
            <div className="main-page-project-members-container">

                <div className="members-list-title">
                    <span>
                        Collaborators
                    </span>
                </div>
                <div className="members-list-container">
                    {otherUsers?.map((user) => <UserInOneProjectInfo key={user.id} user={user} />)}
                </div>
            </div>
        )
    }





}


export default CurrentProjectUserInfo;
