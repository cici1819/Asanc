import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom"
import userLogo from "../../../img/user-logo.png"
import { getCurrUserProjects } from "../../../store/projectReducer";

import './Collaborators.css';


function CurrentUserCollaborators() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const projects = useSelector(state => state.projects.allProjects);
    const projectsArr = Object.values(projects);

    // console.log(projectsArr, "***********projectsARR")
    useEffect(() => {
        dispatch(getCurrUserProjects())
    }, [dispatch]);


    if (!projects || !projectsArr.length) {
        return null

    }

    let collaborators = [];
    let newUsersArr = projectsArr.map(project => project.users);
    // console.log(newUsersArr, "&&&&&&&&&&&***********UserARR")

    //  collaborators = [...newUsersArr]


    for (let i = 0; i < newUsersArr.length; i++) {
        let usersArr = newUsersArr[i];
        for (let j = 0; j < usersArr.length; j++) {
            let userObj = usersArr[j]
            collaborators.push(userObj)
        }
    }



    const uniqueUsers = [...new Map(collaborators.map((m) => [m.id, m])).values()]


    // console.log(uniqueUsers, "cccccccccccccc,Collaborators")

    const uniqueColla = uniqueUsers.filter(user => user.id !== sessionUser.id)

    if (uniqueColla.length === 0) {
        return (<>

        </>)
    } else {
        return (
            <div className="home-page-members-container">
                <div className="h-users-title">
                    <span className="h-u-s1">
                        People
                    </span>

                    <span className="h-u-s2">
                        Frequent Collaborators
                    </span>
                </div>
                <div className="members-list-card">
                    {uniqueColla?.map((user) => {
                        return (
                            <div className="h-user-s-card" key={user.id}>
                                <img src={userLogo} style={{ backgroundColor: user?.avatar_color }} className="h-users-logo" />
                                <div className="h-username">
                                    {user.firstName}
                                </div>
                            </div>

                        )

                    })}
                </div>
            </div >
        )
    }






}

export default CurrentUserCollaborators
