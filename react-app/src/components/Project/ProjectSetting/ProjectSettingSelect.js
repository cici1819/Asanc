import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import "./ProjectSettingSelect.css"

const ProjectSetting = ({ setShowProjectEditModal, setShowProjectDeleteModal, currentProject }) => {
    const sessionUser = useSelector((state) => state.session.user);
    // const projects = useSelector(state => state.projects.allProjects)
    // const projectsArr = Object.values(projects)
    // const { projectId } = useParams()
    // let [showMenu, setShowMenu] = useState(false)
    // const dispatch = useDispatch()
    let [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        else setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    if (!sessionUser) {
        return null;
    }


    let title
    let icon
    let color
    let sessionUserIsOwner = false

    // let currentProject = projectsArr.find(project => project?.id == projectId)
    if (currentProject) {
        title = currentProject?.title
        icon = currentProject?.icon
        color = currentProject?.color
        // console.log("current Project ",currentProject)
        sessionUserIsOwner = currentProject.owner_id == sessionUser.id
        // console.log ("owned by -------?" , sessionUserIsOwner)
    }


    return (
        <>

            <div className='select-setting'>
                <img className={`mainPage-single-project-icon`} src={icon} style={{ backgroundColor: { color } }} />
                <span className='project-title'>
                    {title}
                </span>
                {sessionUserIsOwner &&
                    <div className='arrow-icon' onClick={openMenu}>
                        <span id="project-setting-title">Project setting</span>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                }

            </div>

            {showMenu && sessionUserIsOwner && (
                <div className='project-setting-dropMenu'>
                    <div className='project-e-wapper'>
                        <div className='project-edit-div'
                            onClick={() => {
                                setShowProjectEditModal(true)
                            }
                            }>
                            <span className='s-e-t'>
                                Project Edit
                            </span>
                            <span className='s-e-icon'>
                                <i className="fa-solid fa-pencil"></i>
                            </span>
                        </div>
                    </div>
                    <div className='project-delete-div'
                        onClick={() => {

                            // console.log("showServerEditModal clickruning!!!!!!!!!!!")

                            setShowProjectDeleteModal(true)

                        }}>

                        <span>
                            Project Delete
                        </span >
                        <span>
                            <i className="fa-solid fa-trash-can"></i>
                        </span>

                    </div>


                </div>)}


        </>
    )
}


export default ProjectSetting;
