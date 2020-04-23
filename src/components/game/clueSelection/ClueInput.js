import React from 'react';
import InputField from "../../../views/design/customized-layouts/InputField";
import Button from "../../../views/design/Button";
import Green from "../../../views/design/font-families/Green";
import styled from "styled-components";

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

// The input field to submit a clue.
export class ClueInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clue: '',
            placeholder: 'Enter your clue here...'
        }
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    render() {
        var clue = this.state.clue;
        return (
            <div style={{"marginTop": "-5%"}}>
                <InputClue placeholder={this.state.placeholder}
                           onFocus={() => this.handleInputChange('placeholder', '')} onChange={e => {
                    this.handleInputChange('clue', e.target.value);
                }}/>
                {this.state.clue ?
                    <FlexButton onClick={() => this.props.handleClue(clue)}><Green>Submit</Green></FlexButton> : null}
            </div>
        );
    }
}