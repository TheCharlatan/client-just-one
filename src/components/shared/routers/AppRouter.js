import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Lobby from "../../lobby/Lobby";
import {MainPageGuard} from "../routeProtectors/MainpageGuard";
import MainPageRouter from "./MainPageRouter";
import Test from "../../login/Test";
import Registration from "../../registration/registration";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
              <Route
                  path="/mainpage"
                  render={() => (
                      <MainPageGuard>
                          <MainPageRouter base={""} />
                      </MainPageGuard>
                  )}
              />
              //todo add path parameter variabe.
          {/*
           <Route

              path="/game:pathParam?"
              render={() => (
                  <GameRouter base={"/game/:pathParam?"} />
              )}
            />*/}
              <Route
                  path="/game/1"
                  render={() => (
                      <GameRouter base={"/game/1"} />
                  )}
              />
              <Route
                  path="/registration"
                  exact
                  render={() => (
                      <Registration />
                  )}
              />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
              <Route
              path="/lobby/:pathParam?"
              exact
              render={() => (
                  <Lobby />
              )}
            />

            <Route
              path="/test"
              exact
              render={() => (
               
                  <Test />
            
              )}
            />
            <Route path="/" exact render={() => <Redirect to={"/game"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
