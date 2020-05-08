import React from 'react';
import styled from "styled-components";
import Green from "../../../views/design/font-families/Green";


export class LeaderboardControls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            leaderboardData: [],
            orderedDescending: true
        }
    }

    render() {
        return (
            <ControlsContainer>
                <HiddenButton onClick={() => {this.props.orderFunction()}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <svg height="10" width="20" style={{margin: '2px'}}>
                            <polygon points="10,0 20,10 0,10" style={{fill: '#00BB37', stroke: 'black', strokeWidth: 1}} />
                        </svg>
                        <svg height="10" width="20" style={{margin: '2px'}}>
                            <polygon points="0,0 10,10 20,0" style={{fill: '#00BB37', stroke: 'black', strokeWidth: 1}} />
                        </svg>
                    </div>
                </HiddenButton>
                <HiddenButton onClick={() => {this.props.scrollToLeaderFunction()}}>
                    <Green>
                        Leader
                    </Green>
                </HiddenButton>
                <HiddenButton onClick={() => {this.props.scrollToCurrentUserFunction()}}>
                    <Green>
                        Me
                    </Green>
                </HiddenButton>
            </ControlsContainer>
        );
    }
}


const ControlsContainer = styled('div')`
height: 42px;
background: #F8E7D1;
border: 4px solid #DDC18E;
boxSizing: border-box;
boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
display: flex;
flex-direction: row;
justify-content: space-between;
`;


const HiddenButton = styled.button`
background: none;
border: none;
`;