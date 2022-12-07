import React, { useState, useEffect } from "react";
import userLogo from "../../../img/user-logo.png"


import './UserInOneProject.css';

function CurrentUserInfo({ currentUser }) {
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
                <img src={userLogo} style={{ backgroundColor: currentUser?.avatar_color }} onClick={openUser} />
            </div>
            {showUser && <div className='single-member-container' >

                <div className="c-user-profile">
                    <div className="c-u-p-id">
                        <span>
                            User Id :
                        </span>
                        <span className="c-user-p-3">
                            <i className="fa-light fa-hashtag"></i>
                        </span>
                        <span className="c-user-p-4">
                            {currentUser?.id}
                        </span>
                    </div>
                    <div className="c-user-p-4">
                     Username : {currentUser?.username}
                    </div>
                    <div className="c-u-p-name">
                        <div className="c-user-p-1">
                            First Name: {currentUser?.firstName}
                        </div>
                        <div className="c-user-p-2">
                            Last Name: {currentUser?.lastName}
                        </div>


                    </div>

                </div>

            </div>}


        </>


    );
}

export default CurrentUserInfo;
