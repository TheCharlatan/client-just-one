import React from 'react';
import styled from "styled-components";
import Green from "../../../views/design/font-families/Green";
import Blue from "../../../views/design/font-families/Blue";


export class TeamStats extends React.Component{

    constructor(props) {
        super(props);
    }

    // TODO: Get actual time and skipped cards.
    render() {
        return (
            <React.Fragment>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Correct
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedCorrect}
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Incorrect
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedWrong}
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Skipped
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.skipped}
                    </Blue>
                </Label>
            </StatsRow>
            </React.Fragment>
        );
    }
}


const Label = styled.div`
margin: 15px;
width: 240px;
height: 36px;
background: white;
border: 4px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align: center;
`;


const StatsRow = styled.div`
margin: 0px 200px;
display: flex;
flexDirection: row;
justify-content: space-between;
line-height: 0px;
`;


/*
// Code for all stats (including times).
<React.Fragment>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Correct
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedCorrect}
                    </Blue>
                </Label>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Time For Clues
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        x:xx
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Incorrect
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {this.props.gameStats.wordsGuessedWrong}
                    </Blue>
                </Label>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Time For Guesses
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        x:xx
                    </Blue>
                </Label>
            </StatsRow>
            <StatsRow>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Skipped
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        {13 - this.props.gameStats.wordsGuessedCorrect - this.props.gameStats.wordsGuessedWrong}
                    </Blue>
                </Label>
                <Label style={{background: '#F8E7D1'}}>
                    <Green style={{letterSpacing: '0.1em'}}>
                        Total Time
                    </Green>
                </Label>
                <Label style={{background: 'white'}}>
                    <Blue style={{letterSpacing: '0.1em'}}>
                        xx
                    </Blue>
                </Label>
            </StatsRow>
            </React.Fragment>
 */