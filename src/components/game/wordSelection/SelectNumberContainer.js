import React from 'react';
import styled from 'styled-components';

import {Button} from "../../../views/design/Button";
import Red from "../../../views/design/font-families/Red";
import Orange from "../../../views/design/font-families/Orange";
import Green from "../../../views/design/font-families/Green";
import Blue from "../../../views/design/font-families/Blue";

import { api } from '../../../helpers/api';



// <SelectNumberContainer gameId={this.state.gameModel.id}/>

export function SelectNumberContainer(props) {

    return (
        <ButtonBox>
            <NumberButton id={this.props.gameId} number={1} color={"red"} />
            <NumberButton id={this.props.gameId} number={2} color={"orange"} />
            <NumberButton id={this.props.gameId} number={3} color={"green"} />
            <NumberButton id={this.props.gameId} number={4} color={"blue"} />
            <NumberButton id={this.props.gameId} number={5} color={"red"} />
        </ButtonBox>
    );
}


function NumberButton(props) {

    let textElement;

    switch (props.color) {
        case "red":
            textElement = <Red>{props.number}</Red>;
            break;
        case "orange":
            textElement = <Orange>{props.number}</Orange>;
            break;
        case "green":
            textElement = <Green>{props.number}</Green>;
            break;
        case "blue":
            textElement = <Blue>{props.number}</Blue>;
            break;
        default:
            textElement = <Red>{props.number}</Red>;
            break;
    }

    return (
        <ButtonWhite
            onClick={async () => {
                console.log("Clicked " + props.number);
                try {
                    let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
                    await api.post(`/game/${props.gameId}/number`, props.number, {headers: {'Authorization': requestHeader}});
                } catch (error) {
                    alert(`An error occurred when submitting the number: ${error}`);
                    return;
                }
                // TODO: Display wait screen.
                alert("Successfully submitted the number. Please wait.")
            }}
        >
            {textElement}
        </ButtonWhite>
    );
}


let ButtonBox = styled.div`
padding: 0.5em;
border-radius: 2px;
width: 14em;

display: flex;
flex-wrap: wrap;

background: #F8E7D1;
border: 4px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


let ButtonWhite = styled(Button)`
margin: 0.3em;
width: 12em;
background: #FFFFFF;
border: 4px solid #DDC18E;
`;