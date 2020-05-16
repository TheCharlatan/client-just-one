import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Violet from "../../views/design/font-families/Violet";
import React from "react";

import { api, handleError } from '../../helpers/api';


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  background: #FFFFFF;
  &:hover {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.4);
  transform: translateY(-0.25em);
  cursor:pointer;
}
`;


// button below chat component on main page
function ChatButton(props) {
    return (
        <FlexButton
            onClick={() => {
                let userId = sessionStorage.getItem("userId");
                props.history.push(`/user/${userId}`);
            }}>
            <Violet>My Profile</Violet>
        </FlexButton>
    );
}

export default ChatButton;