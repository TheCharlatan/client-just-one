import React from 'react';
import styled from "styled-components";

import {UserStats} from "./UserStats";
import {TeamStats} from "./TeamStats";
import Green from "../../../views/design/font-families/Green";


// The end of game overview.
export class GameOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <React.Fragment>
              <p>Finish button placeholder.</p>
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
              <TeamStats gameModel={this.props.gameModel} />
          </React.Fragment>
        );
    }
}


const IndividualStatsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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