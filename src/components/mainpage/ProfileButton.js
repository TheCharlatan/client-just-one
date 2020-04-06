import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Violet from "../../views/design/font-families/Violet";
import React from "react";

import { api, handleError } from '../../helpers/api';


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  background: #FFFFFF;
`;


// button below chat component on main page
function ChatButton() {
    return (
        <FlexButton
            onClick={() => {
                // redirect to own profile
            }}>
            <Violet>Profile</Violet>
        </FlexButton>
    );
}

export default ChatButton;