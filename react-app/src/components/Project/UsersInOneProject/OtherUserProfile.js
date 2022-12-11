import React, { useState, useEffect } from "react";
import userLogo from "../../../img/user-logo.png"
import CurrentUserInfo from "./CurrentUserProfile";


import './UserInOneProject.css';

function UserInOneProjectInfo({ user }) {
    console.log("user ======= in UserInOneProjectInfo", user)
    const [showUser, setShowUser] = useState(false);
    const openUser = () => {
        if (showUser) return;
        setShowUser(true);
    };

    useEffect(() => {
        if (!showUser) return;

        const closeUser = () => {
            setShowUser(false);
        };

        document.addEventListener('click', closeUser);

        return () => document.removeEventListener("click", closeUser);
    }, [showUser]);




    return (
        <>
            <div>
                <img src={userLogo} style={{ backgroundColor: user?.avatar_color }} onClick={openUser} className="user-logo" />
            </div>
            <div>
                {showUser && <div className='member-container' >

                

                    <div className="p-user-profile">

                        <div className="u-p-name">
                            <div className="user-p-1">
                                First Name: {user?.firstName}
                            </div>
                            <div className="user-p-2">
                                Last Name: {user?.lastName}
                            </div>


                        </div>

                    </div>

                </div>}
            </div>



        </>


    );
}

export default UserInOneProjectInfo;
