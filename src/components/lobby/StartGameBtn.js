import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Blue from "../../views/design/font-families/Blue";
import React from "react";

import { api, handleError } from '../../helpers/api';

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width:50%;
`;


// one of the buttons in the middle part of lobby page
function StartGameBtn() {
    return (
        <FlexButton
            onClick={() => {
                // start game
            }}>
            <Blue>Start Game</Blue>
        </FlexButton>
    );
}

export default StartGameBtn;