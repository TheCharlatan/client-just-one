import React from "react";
import { Redirect } from "react-router-dom";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <GameGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const MainPageGuard = props => {
    //First check if the user is inside a game
    if(localStorage.getItem('gameId')) {
        return <Redirect to={`/game/${localStorage.getItem('gameId')}`} />;
    }
    //Second check if user is inside a lobby
    if(localStorage.getItem('lobbyId')) {
        return <Redirect to={`/lobby/${localStorage.getItem('lobbyId')}`} />;
    }
    //Third check if the user is logged in
    if (localStorage.getItem("token")) {
        return props.children;
    }
    //Otherwise redirect to login page
    return <Redirect to={"/login"} />;

};