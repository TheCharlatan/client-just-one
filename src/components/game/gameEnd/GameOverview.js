import React from 'react';
import styled from "styled-components";

import {withRouter} from "react-router-dom";
import {api, handleError} from "../../../helpers/api";

import {UserStats} from "./UserStats";
import {TeamStats} from "./TeamStats";
import Green from "../../../views/design/font-families/Green";
import FinishButton from "./FinishButton";
import {Spinner} from "../../../views/design/Spinner";


// The end of game overview.
class GameOverview extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            redirectToLobbyTimer: null,
            gameStats: null
        };
    }


    async componentDidMount() {

        try {
            let gameId = localStorage.getItem("gameId");
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let response = await api.get(`/game/stat/${gameId}`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({gameStats: response.data});
        }
        catch (error) {
            alert(`Something went wrong while fetching the game data: \n${handleError(error)}`);
        }

        // setup redirect timer
        let timer = setTimeout(() => {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let requestBody = localStorage.getItem('userId');
            let gameId = localStorage.getItem('gameId');
            localStorage.removeItem("gameId");
            api.delete(`game/${gameId}`,
                {headers:{'X-Auth-Token': requestHeader},data:requestBody})
                .then(r => this.props.history.push(`/lobby/${localStorage.getItem('lobbyId')}`));
        }, 20000);

        this.setState({redirectToLobbyTimer: timer});
    }


    componentWillUnmount() {
        clearTimeout(this.state.redirectToLobbyTimer);
    }


    render() {

        if (this.state.gameStats === null) {
            return <Spinner />
        }

        return (
          <React.Fragment>
              <FinishButton timerId={this.timerId}/>
              <IndividualStatsContainer style={{margin: '10px 50px'}}>
                  <div style={{paddingTop: '10.45em'}}>
                  <TextLabel>
                      <Green style={{fontSize: 16, letterSpacing: '0.1em'}}>
                          Points
                      </Green>
                  </TextLabel>
                  </div>
                  {this.props.users.map((user) => {
                    return <UserStats user={user} gameStats={this.state.gameStats} />
                  })}
              </IndividualStatsContainer>
              <TeamStats gameStats={this.state.gameStats} />
          </React.Fragment>
        );
    }
}


const IndividualStatsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 0px;
`;


const TextLabel = styled.div`
width: 180px;
height: 37px;
margin: 20px 0px;

background: #F8E7D1;
border: 4px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
`;


export default withRouter(GameOverview);


/*
// Code for all stats -> similar change with UserStats.
<React.Fragment>
              <FinishButton timerId={this.timerId}/>
              <IndividualStatsContainer style={{margin: '10px 50px'}}>
                  <div style={{paddingTop: '10.45em'}}>
                  <TextLabel>
                    <Green style={{fontSize: 16, letterSpacing: '0.1em'}}>
                        Correct
                    </Green>
                  </TextLabel>
                  <TextLabel>
                      <Green style={{fontSize: 16, letterSpacing: '0.1em'}}>
                          Incorrect
                      </Green>
                  </TextLabel>
                  <TextLabel>
                      <Green style={{fontSize: 16, letterSpacing: '0.1em'}}>
                          Guessing Time
                      </Green>
                  </TextLabel>
                  <TextLabel>
                      <Green style={{fontSize: 16, letterSpacing: '0.1em'}}>
                          Points
                      </Green>
                  </TextLabel>
                  </div>
                  {this.props.users.map((user) => {
                    return <UserStats user={user} />
                  })}
              </IndividualStatsContainer>
              <TeamStats gameStats={this.state.gameStats} />
          </React.Fragment>
 */
