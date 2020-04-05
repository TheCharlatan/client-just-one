import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Violet from "../../views/design/font-families/Violet";
import React from "react";

import { api, handleError } from '../../helpers/api';


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


function JoinLobbyButton() {
    return (
        <FlexButton
            onClick={() => {
                // join lobby}}>
            }}>
            <Violet>Join Lobby</Violet>
        </FlexButton>
    );
}

export default JoinLobbyButton;