import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Pink from "../../views/design/font-families/Pink";
import React from "react";

import { api, handleError } from '../../helpers/api';


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


// one of the buttons in the middle part of main page
function TutorialButton() {
    return (
        <FlexButton
            onClick={() => {
                // redirect to tutorial
            }}>
            <Pink>Tutorial</Pink>
        </FlexButton>
    );
}

export default TutorialButton;