import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Orange from "../../views/design/font-families/Orange";
import React from "react";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


// one of the buttons in the middle part of main page
function CreateLobbyButton(props) {
    return (
        <FlexButton
            onClick={props.onClick}>
                <Orange>Create Lobby</Orange>
        </FlexButton>
    );
}

export default CreateLobbyButton;