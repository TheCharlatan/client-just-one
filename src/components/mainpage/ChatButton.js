import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Yellow from "../../views/design/font-families/Yellow";
import React from "react";
import { api, handleError } from '../../helpers/api';


const FlexButton = styled.button`
position: relative;
width: 100%; // scales (was 267px before for a column-width of 272px)
height: 45px;
display: flex;
align-items: center;
justify-content: center;
line-height: 0px;
background: #FFFFFF;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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