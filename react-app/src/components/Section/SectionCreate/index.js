import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSectionToProject } from "../../../store/sectionReducer";
import { getOneProject } from "../../../store/projectReducer";
import './SectionCreate.css';

const SectionCreate = ({ projectId}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [titleInput, setTitleInput] = useState(false);
    const [timer, setTimer] = useState(null)
    const [errors, setErrors] = useState([]);

    const handleCreateInput = () => {
        setTitleInput(true)
        setTitle('')
    }
    useEffect(() => {
        const errors = [];
        if (title.length > 50) {
            errors.push("Title should be less than 50 characters")
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
        clearTimeout(timer)
        const newTimer = setTimeout(() => {
            const payload = {
                title: title, projectId: projectId
            };
            const newSection = dispatch(addSectionToProject(payload))
            if (newSection) {
                dispatch(getOneProject(projectId))
            }
        }, 500)

        setTimer(newTimer)
        setErrors([])
        setTitleInput(false)

    }

    const handleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);

    }

    return (
        <>
            {!titleInput&&<div onClick={handleCreateInput} className="addSection-main-container"><i className="fa-solid fa-plus" id="create-phase-plus"></i>
                <span> Add section</span></div>}
            {titleInput  && <div>
                <div>
                    {errors.length > 0 && (<div>

                        {errors[0]}

                    </div>)}
                    <input className='add-section-input'
                        type='text'
                        value={title}
                        placeholder="Untitled Project"
                        onBlur={handleInputBlur}
                        onChange={handleChange} />

                </div>
            </div>}

        </>
    )













}


export default SectionCreate;
