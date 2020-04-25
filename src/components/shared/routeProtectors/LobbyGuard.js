import React from "react";
import { Redirect } from "react-router-dom";

export const LobbyGuard = props => {
    //first check if user is in a game
    if (localStorage.getItem('gameId')){
        return <Redirect to={`/game/${localStorage.getItem('gameId')}`}/>;
    }
    //Second check if user is in lobby
    if (localStorage.getItem('lobbyId') && window.location.pathname === `/lobby/${localStorage.getItem('lobbyId')}`) {
        return props.children;
    }
    if(localStorage.getItem('lobbyId') && window.location.pathname !== `/lobby/${localStorage.getItem('lobbyId')}`) {
        return <Redirect to={`/lobby/${localStorage.getItem('lobbyId')}`}/>;
    }
    //Third check if user is already logged in
    if (localStorage.getItem("token")) {
        return <Redirect to={"/mainpage"} />;
    }
    else {
        return <Redirect to={"/login"} />;
    }

};