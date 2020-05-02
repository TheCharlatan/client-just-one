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
            <NumberButton id={props.gameId} number={1} color={"red"} />
            <NumberButton id={props.gameId} number={2} color={"orange"} />
            <NumberButton id={props.gameId} number={3} color={"green"} />
            <NumberButton id={props.gameId} number={4} color={"blue"} />
            <NumberButton id={props.gameId} number={5} color={"red"} />
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
                try {
                    let requestBody = JSON.stringify({'wordIndex': props.number});
                    console.log(requestBody);
                    let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
                    await api.put(`/game/${props.id}/number`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
                } catch (error) {
                    alert(`An error occurred when submitting the number: ${error}`);
                    return;
                }
                // TODO: Display wait screen.
                //alert("Successfully submitted the number. Please wait.")
            }}
        >
            {textElement}
        </ButtonWhite>
    );
}


// TODO: Position it properly.
let ButtonBox = styled.div`
padding: 0.5em;
border-radius: 2px;
width: 14em;

display: flex;
flex-wrap: wrap;

background: #F8E7D1;
border: 3px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


let ButtonWhite = styled(Button)`
margin: 0.3em;
width: 12em;
background: #FFFFFF;
border: 3px solid #DDC18E;
`;