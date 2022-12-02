import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getOneProject } from "../../../store/projectReducer";
import UserInOneProjectInfo from "./OtherUserProfile";
import './UserInOneProject.css';


function CurrentProjectUserInfo() {
    const dispatch = useDispatch();
    // const [memberDetail, setMemberDetail] = useState(false);
    const { projectId } = useParams();

    console.log("UserInOneProject     project ID", projectId)

    useEffect(() => {
        dispatch(getOneProject(projectId))
    }, [dispatch]);



    const currentProject = useSelector(state => state.projects?.singleProject)
     console.log("CurrentProject.single~~~~~~~~~~", currentProject)
    let usersInCurrentProject = useSelector(state => state.projects.singleProject?.users)

     console.log('usersInCurrentProject!!!!!!!!', usersInCurrentProject)



    if (!usersInCurrentProject) {
        return (<>
            @@@@@@@@@@@@@@@@@@222222222
        </>)
    }

    if (!currentProject) return (<>
        111111111111111111111111111
    </>


    )


    return (
        <div className="main-page-project-members-container">

            <div className="members-list-title">
                <sapn>
                    Collaborators
                </sapn>
            </div>
            <div className="members-list-container">
                {usersInCurrentProject?.map((user) => <UserInOneProjectInfo key={user.id} user={user} />)}
            </div>
        </div>
    )
}


export default CurrentProjectUserInfo;
