import React from 'react';
import styled from "styled-components";

import {UserStats} from "./UserStats";
import {TeamStats} from "./TeamStats";


// The end of game overview.
export class GameOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <React.Fragment>
              <p>Finish button placeholder.</p>
              <IndividualStatsContainer>
                  {this.props.users.map((user) => {
                    return <UserStats user={user} />
                  })}
              }
              </IndividualStatsContainer>
              <TeamStats />
          </React.Fragment>
        );
    }
}


const IndividualStatsContainer = styled.div`
    display: grid;
    grid-template-rows: 180px 60px 60px 60px 60px; // avatar, correct, incorrect, guessing time, points
`;


const TeamStatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25vw);
    grid-template-rows: repeat(3, auto);
`;