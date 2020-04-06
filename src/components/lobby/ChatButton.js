import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Yellow from "../../views/design/font-families/Yellow";
import React from "react";

import { api, handleError } from '../../helpers/api';


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
`;


// button below chat component on main page
function ChatButton() {
    return (
        <FlexButton
            onClick={() => {
                // implement chat button
            }}>
            <Yellow>Chat</Yellow>
        </FlexButton>
    );
}

export default ChatButton;