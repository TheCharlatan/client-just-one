import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Green from "../../views/design/font-families/Green";
import React from "react";

import { api, handleError } from '../../helpers/api';

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width:50%;
`;


// one of the buttons in the middle part of lobby page
function InviteBtn() {
    return (
        <FlexButton
            onClick={() => {
                // leave lobby
            }}>
            <Green>Invite</Green>
        </FlexButton>
    );
}

export default InviteBtn;