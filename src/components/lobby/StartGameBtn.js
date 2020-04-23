import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Blue from "../../views/design/font-families/Blue";
import React from "react";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 80% !important;
`;

// one of the buttons in the middle part of lobby page
function StartGameBtn(props) {
    return (
        <FlexButton
            onClick={props.onClick}>
            <Blue>Start Game</Blue>
        </FlexButton>
    );
}

export default StartGameBtn;