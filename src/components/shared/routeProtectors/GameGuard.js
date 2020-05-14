import React from "react";
import { Redirect } from "react-router-dom";


export const GameGuard = props => {
  //first check if user is in a game
  if (sessionStorage.getItem('gameId') && window.location.pathname === `/game/${sessionStorage.getItem('gameId')}`){
    return props.children;
  }
  if (sessionStorage.getItem('gameId') && window.location.pathname !== `/game/${sessionStorage.getItem('gameId')}`){
    return <Redirect to={`/game/${sessionStorage.getItem('gameId')}`}/>;
  }
  //Second check if user is in lobby
  if(sessionStorage.getItem('lobbyId')) {
    return <Redirect to={`/lobby/${sessionStorage.getItem('lobbyId')}`}/>;
  }
  //Third check if user is already logged in
  if (sessionStorage.getItem("token")) {
    return <Redirect to={"/mainpage"} />;
  }
  else {
    return <Redirect to={"/login"} />;
  }
};
