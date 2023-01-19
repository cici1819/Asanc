import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSectionToProject } from "../../../store/sectionReducer";
import { getOneProject } from "../../../store/projectReducer";
import './SectionCreate.css';

const SectionCreate = ({ projectId, setSectionList }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    // const [timer, setTimer] = useState(null)
    const [errors, setErrors] = useState([]);

    // const handleCreateInput = () => {
    //     setTitleInput(true)
    //     setTitle('')
    // }
    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            // e.preventDefault()
            // let title = e.target.value;
            // if (title === "") {
            //     title = "Untitled Section";
            //     setTitle(title);
            // }

            // const payload = {
            //     title: title, projectId: projectId
            // };
            // const newSection = dispatch(addSectionToProject(payload))
            // if (newSection) {
            //     await dispatch(getOneProject(projectId))
            // }

            // setErrors([])
            // setTitle("")
            // setSectionList([])
            e.target.blur();
        }
    };

    useEffect(() => {
        const input = document.getElementsByClassName("add-section-input")[0];
        input.focus();
    }, [])

    useEffect(() => {
        const errors = [];
        if (title.length > 30) {
            errors.push("Title should be less than 30 characters")
        }
        setErrors(errors);
    }, [title])

    const handleInputBlur = async (e) => {
        e.preventDefault()
        let title = e.target.value;
        if (title === "") {
            title = "Untitled Section";
            setTitle(title);
        }
        // clearTimeout(timer)
        // const newTimer = setTimeout(() => {
        const payload = {
            title: title, projectId: projectId
        };
        const newSection = dispatch(addSectionToProject(payload))
        if (newSection) {
            await dispatch(getOneProject(projectId))
        }
        // }, 200)

        // setTimer(newTimer)
        setErrors([])
        setTitle("")
        setSectionList([])

    }

    const handleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);


    }

    return (
        <>
            {/* {!titleInput&&<div onClick={handleCreateInput} className="addSection-main-container"><i className="fa-solid fa-plus" id="create-phase-plus"></i>
                <span> Add section</span></div>} */}
            <div>
                <div >
                    {errors.length > 0 && (<div className="s-detail-content">

                        {errors[0]}

                    </div>)}

                    <input
                        id="fname"
                        className='add-section-input'
                        type='text'
                        value={title}
                        placeholder="Untitled Section"
                        onBlur={handleInputBlur}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                    />

                </div>
            </div>

        </>
    )


}


export default SectionCreate;
