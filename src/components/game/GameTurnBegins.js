import * as React from 'react';
import { api, handleError } from '../../helpers/api';
import {Redirect, withRouter} from 'react-router-dom';
import Red from "../../views/design/font-families/Red";
import Orange from "../../views/design/font-families/Orange";
import {
  BaseContainerBody,
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

const Timer = styled.div`
position: fixed;
top: 50%;
left: 50%
transform: translate( -50%, -50%);

font-family: fantasy;
font-style: normal;
font-weight: normal;
font-size: 80px;
line-height: 0px;
letter-spacing: 0.41em;
text-transform: uppercase;
font-feature-settings: 'cpsp' on, 'ss04' on;
color: #00B637;
mix-blend-mode: darken;
text-stroke: 2px #00922B;
-webkit-text-stroke: 2px #00922B;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
z-index: 10;
`;


class GameTurnBegins extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      gameModel: null,
      users: [],
      redirect: false,
      seconds: 5,
      time: {},
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
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

      let timeLeftVar = this.state.seconds;
      this.setState({time: timeLeftVar});

    } catch (error) {
      alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
    }

  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({time: seconds, seconds: seconds});
    if (seconds === -1) {
      clearInterval(this.timer);
      this.setState({redirect: true});
    }
  }


  render() {
    return this.state.redirect
        ? <Redirect to={"/mainpage"} />
        : <BaseContainerBody>
            {!this.state.users ? (
            <Spinner />
              ) : (
            <BaseContainerGame>
              <Timer>{this.startTimer()} {this.state.seconds} </Timer>
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

export default withRouter(GameTurnBegins);
