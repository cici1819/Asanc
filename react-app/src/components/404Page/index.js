import { Redirect, useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import "./PageNotFound.css"

function FourOhFourPage (){
    const history= useHistory()
    return (
        <div className="pageNotFound">
            <Redirect to={"/home"}></Redirect>
            {/* <h1>Page not found</h1> */}
            <h2>Page not found redirecting</h2>

        </div>
    )
}

export default FourOhFourPage
