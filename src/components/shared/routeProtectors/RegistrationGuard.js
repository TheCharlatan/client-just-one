import React from "react";
import { Redirect } from "react-router-dom";

export const RegistrationGuard = props => {
    //First check if the user is inside a game
    if(sessionStorage.getItem('gameId')) {
        return <Redirect to={`/game/${sessionStorage.getItem('gameId')}`} />;
    }
    //Second check if user is inside a lobby
    if(sessionStorage.getItem('lobbyId')) {
        return <Redirect to={`/lobby/${sessionStorage.getItem('lobbyId')}`} />;
    }
    //Third check if user is not logged in
    if (!sessionStorage.getItem("token")) {
        return props.children;
    }
    // if user is already logged in, redirects to the main /app
    return <Redirect to={"/mainPage"} />;
};
