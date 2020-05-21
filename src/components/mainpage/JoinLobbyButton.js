import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import React from "react";


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


// one of the buttons in the middle part of main page
function JoinLobbyButton(props) {
    return (
        <FlexButton
            onClick={() => {
                props.loadLobbies();
            }}>
            <Red>Join Lobby</Red>
        </FlexButton>
    );
}

export default JoinLobbyButton;