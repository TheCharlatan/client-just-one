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


function TutorialButton() {
    return (
        <FlexButton
            onClick={() => {
                // create lobby
            }}>
            <Pink>Tutorial</Pink>
        </FlexButton>
    );
}

export default TutorialButton;