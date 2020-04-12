import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Green from "../../views/design/font-families/Green";
import React from "react";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 80% !important;
`;


// one of the buttons in the middle part of lobby page
function InviteBtn(props) {
    return (
        <FlexButton
            onClick={props.onClick}>
            <Green>Invite</Green>
        </FlexButton>
    );
}

export default InviteBtn;