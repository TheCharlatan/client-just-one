import React from "react";
import { Redirect } from "react-router-dom";


export const GameGuard = props => {
  console.log("test");
  //first check if user is in a game
  if (localStorage.getItem('gameId') && window.location.pathname === `/game/${localStorage.getItem('gameId')}`){
    return props.children;
  }
  if (localStorage.getItem('gameId') && window.location.pathname !== `/game/${localStorage.getItem('gameId')}`){
    return <Redirect to={`/game/${localStorage.getItem('gameId')}`}/>;
  }
  //Second check if user is in lobby
  if(localStorage.getItem('lobbyId')) {
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
