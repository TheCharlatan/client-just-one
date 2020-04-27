import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
  //First check if the user is inside a game
  if(localStorage.getItem('gameId')) {
    return <Redirect to={`/game/${localStorage.getItem('gameId')}`} />;
  }
  //Second check if user is inside a lobby
  if(localStorage.getItem('lobbyId')) {
    return <Redirect to={`/lobby/${localStorage.getItem('lobbyId')}`} />;
  }
  //Third check if user is not logged in
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to={"/mainPage"} />;
};
