import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import React from "react";

import { api, handleError } from '../../helpers/api';

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width:50%;
`;


// one of the buttons in the middle part of lobby page
function LeaveBtn() {
    return (
        <FlexButton
            onClick={() => {
                // leave lobby
            }}>
            <Red>Leave</Red>
        </FlexButton>
    );
}

export default LeaveBtn;