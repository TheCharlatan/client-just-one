import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import React from "react";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 80% !important;
`;


// one of the buttons in the middle part of lobby page
function LeaveBtn(props) {
    return (
        <FlexButton
            onClick={props.onClick}>
            <Red>Leave</Red>
        </FlexButton>
    );
}

export default LeaveBtn;