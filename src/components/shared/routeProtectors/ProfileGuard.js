import React from "react";
import { Redirect } from "react-router-dom";

export const ProfileGuard = props => {
    // user is logged in
    if (localStorage.getItem('token')){
        return props.children;
    }
    else {
        return <Redirect to={"/login"} />;
    }
};