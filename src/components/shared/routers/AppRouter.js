import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Lobby from "../../lobby/Lobby";
import {MainPageGuard} from "../routeProtectors/MainpageGuard";
import MainPageRouter from "./MainPageRouter";
import Registration from "../../registration/Registration";
import Game from "../../game/Game";
import {RegistrationGuard} from "../routeProtectors/RegistrationGuard";
import {GameGuard} from "../routeProtectors/GameGuard";
import {LobbyGuard} from "../routeProtectors/LobbyGuard";
import {ProfileGuard} from "../routeProtectors/ProfileGuard";
import {UserProfile} from "../../profile/UserProfile";
import Tutorial from "../../Tutorial/Tutorial";

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

              <Route
                  path="/tutorial"
                  render={() => (
                      <MainPageGuard>
                          <Tutorial />
                      </MainPageGuard>
                  )}
               />


           <Route
              path="/game:pathParam?"
              render={(props) => (
                  <GameGuard>
                        <Game base={"/game/"+props.match.params.id} id={props.match.params.id} />
                  </GameGuard>
              )}
            />
              <Route
                  path="/registration"
                  exact
                  render={() => (
                      <RegistrationGuard>
                            <Registration />
                      </RegistrationGuard>
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
                  <LobbyGuard>
                        <Lobby />
                  </LobbyGuard>
              )}
            />

            <Route
                path="/user/:userProfileId"
                exact
                render={(parentProps) =>
                    <ProfileGuard>
                        <UserProfile edit={false} parentProps={parentProps}/>
                    </ProfileGuard>
                }
            />
              <Route
                  path="/user/:userProfileId/edit"
                  exact
                  render={(parentProps) =>
                      <ProfileGuard>
                          <UserProfile edit={true} parentProps={parentProps}/>
                      </ProfileGuard>
                  }
              />

            <Route path="/" exact render={() => <Redirect to={"/login"} />} />
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


/*
To test GameOverview:
<Route path="/gameOverviewTest" exact render={() => <GameOverview
                  test = {1}
                gameModel = {{
                  id: 22,
                  playerIds: [1, 2, 3],
                  round: 13,
                  gameStatus: 'GAME_OVER',
                  words: ['a', 'b', 'c', 'd', 'e'],
                  wordIndex: 2,
                  score: 128,
                  activePlayerId: 2,
                  clues: ['clue1', 'clue2'],
                  timestamp: 1,
                  activePlayer: 3,
                  wordsGuessedCorrect: 9,
                  wordsGuessedWrong: 3,
                  cardStackCount: 0,
                  cardGuessedCount: 6}}
                users = {[
                    {
                        id: 1,
                        username: 'user1',
                        gameId: 22,
                        isActivePlayer: false
                    },
                    {
                        id: 2,
                        username: 'user2',
                        gameId: 22,
                        isActivePlayer: true
                    },
                    {
                        id: 3,
                        username: 'user3',
                        gameId: 22,
                        isActivePlayer: false
                    }
                ]}
              />} />
 */
