import React from 'react';
import InputField from "../../../views/design/customized-layouts/InputField";
import Button from "../../../views/design/Button";
import Green from "../../../views/design/font-families/Green";
import styled from "styled-components";
import {api, handleError} from "../../../helpers/api";


// The input field to submit a clue.
export class ClueInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clue1: '',
            clue2: '',
            clue1Submitted: false,
            clue2Submitted: false,
            placeholder1: 'Enter your clue here...',
            placeholder2: 'Enter other clue here...'
        }
    }


    handleInputChange(key, value) {
        this.setState({[key]: value});
    }

    async handleClues(clue1, clue2) {

        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            if (clue1 !== this.state.placeholder1 && clue1 !== "" && !this.state.clue1Submitted) {
                let requestBody = JSON.stringify({ clue: clue1 });
                await api.put(`/game/${sessionStorage.getItem('gameId')}/clue`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
            }
            if (clue2 !== this.state.placeholder2 && clue1 !== "" && !this.state.clue2Submitted) {
                let requestBody = JSON.stringify({ clue: clue2 });
                await api.put(`/game/${sessionStorage.getItem('gameId')}/clue`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
            }
        }
        catch (error) {
            console.log(`An error occurred when submitting the clue: \n${handleError(error)}`);
            //return; //todo removed the return otherwise returning error message
        }

        if (clue1 !== this.state.placeholder1 && clue1 !== "" && !this.state.clue1Submitted) {
            this.setState({"clue1Submitted": true});
        }
        if (clue2 !== this.state.placeholder2 && clue2 !== "" && !this.state.clue2Submitted) {
            this.setState({"clue2Submitted": true});
        }

        this.props.updateGame();
    }


    render() {
        let clue1 = this.state.clue1;
        let clue2 = this.state.clue2;

        let button = null;

        if (!this.state.clue1Submitted || (this.props.twoCluesInput && !this.state.clue2Submitted)) {
            button = (
                <FlexButton onClick={() => this.handleClues(clue1, clue2)}>
                    <Green>Submit</Green>
                </FlexButton>
            );
        }

        let secondInput = null;
        if (this.props.twoCluesInput) {
            secondInput = (
                <InputClue
                    placeholder={this.state.placeholder2}
                    onFocus={() => {this.handleInputChange('placeholder2', '');}}
                    onChange={e => {this.handleInputChange('clue2', e.target.value);}}
                    disabled = {(this.state.clue2Submitted) ? "disabled" : ""}
                />
            );
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', "marginTop": "2%", marginBottom :"5%"}}>
                <InputClue
                    placeholder={this.state.placeholder1}
                    onFocus={() => {this.handleInputChange('placeholder1', '');}}
                    onChange={e => {this.handleInputChange('clue1', e.target.value);}}
                    disabled = {(this.state.clue1Submitted) ? "disabled" : ""}
                />
                {secondInput}
                {button}
            </div>
        );
    }
}


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 50% !important;
  margin-top:2%;
`;

const InputClue = styled(InputField)`
  &::placeholder {
  font-family: fantasy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 0.41em;
    text-transform: uppercase;
    font-feature-settings: 'cpsp' on, 'ss04' on;
    color: #F40007;
    mix-blend-mode: darken;
    text-stroke: 1px #CD0003;
    -webkit-text-stroke: 1px #CD0003;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  text-align:center;
   font-family: fantasy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 0.41em;
    text-transform: uppercase;
    font-feature-settings: 'cpsp' on, 'ss04' on;
    color: #F40007;
    text-stroke: 1px #CD0003;
    -webkit-text-stroke: 1px #CD0003;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background:#F8E7D1;
`;
