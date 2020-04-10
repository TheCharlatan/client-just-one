import React from 'react';
import { api, handleError } from '../../helpers/api';
import {Redirect, withRouter} from 'react-router-dom';
import Red from "../../views/design/font-families/Red";
import Orange from "../../views/design/font-families/Orange";
import {
  BaseContainerGame,
  CardGuessedContainer,
  CardStacksContainer,
  GameInfoContainer,
  UserGameContainer
} from "./GameLayout"
import {GameInfo, GameInfoLabel, Info, InfoLabel} from "./GameInfoStyle";
import UserLayout from "./UserLayout";
import Yellow from "../../views/design/font-families/Yellow";
import {CardStack, CardStackLabel, CardStackNumber} from "./GameCardStackStyle";

import {Spinner} from "../../views/design/Spinner";
import styled from "styled-components";

const BaseContainerBody = styled.div`
min-width: 100vw;
min-height: 100vh;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      gameModel: null,
      users: [],
      redirect: false,
    };
  }

  async componentDidMount() {
    try {
      const response = await api.get('game/mock');
      this.setState({gameModel: response.data});
      this.setState({playerIds: response.data.playerIds});

      var i;
      for (i=0; i<response.data.playerIds.length; i++) {
        const user = await api.get('user/mock/' + response.data.playerIds[i]);
        this.setState({user: user.data});
        this.state.users[i] = this.state.user;
      }

      this.id = setTimeout(() => this.setState({ redirect: true}), 5000);

    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }

  }

  async componentWillMount() {
    clearTimeout(this.id);
  }

  render() {
    return this.state.redirect
        ? <Redirect to={"/mainpage"} />
        : <BaseContainerBody>
            {!this.state.users ? (
            <Spinner />
              ) : (
            <BaseContainerGame>
                    <GameInfoContainer>
                      <GameInfo>
                        <GameInfoLabel>
                          <Red> game info </Red>
                        </GameInfoLabel>
                        <InfoLabel>
                          <Orange> Correct</Orange>
                        </InfoLabel>
                        <Info>
                          <Orange> 5 </Orange>
                        </Info>
                        <InfoLabel>
                          <Orange> Wrong</Orange>
                        </InfoLabel>
                        <Info>
                          <Orange> 5 </Orange>
                        </Info>
                      </GameInfo>
                    </GameInfoContainer>

                    <CardStacksContainer>
                      <CardStackLabel>
                        <Yellow> Stack </Yellow>
                      </CardStackLabel>
                      <CardStack/>
                      <CardStackNumber>
                        <Yellow> 5 </Yellow>
                      </CardStackNumber>
                    </CardStacksContainer>

                    <CardGuessedContainer>
                      <CardStackLabel>
                        <Yellow> Guessed </Yellow>
                      </CardStackLabel>
                      <CardStack/>
                      <CardStackNumber>
                        <Yellow> 8 </Yellow>
                      </CardStackNumber>
                    </CardGuessedContainer>
                    <UserGameContainer>
                      {this.state.users.map(user => {
                        return (
                              <UserLayout user={user} key={user.id} />
                        );
                      })}
                    </UserGameContainer>
            </BaseContainerGame>
              )}
        </BaseContainerBody>
  }
}

export default withRouter(Game);
/*
<Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                    <Player user={user} />
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
 */

/*
const response = await api.get('/users');
      // delays continuous execution of an async operation for 1 second.
      // This is just a fake async call, so that the spinner can be displayed
      // feel free to remove it :)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get the returned users and update the state.
      this.setState({ users: response.data });

      // This is just some data for you to see what is available.
      // Feel free to remove it.
      console.log('request to:', response.request.responseURL);
      console.log('status code:', response.status);
      console.log('status text:', response.statusText);
      console.log('requested data:', response.data);

      // See here to get more data.
      console.log(response);
    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }
 */