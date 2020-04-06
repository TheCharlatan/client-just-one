import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import React from "react";

import { api, handleError } from '../../helpers/api';


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  background: #FFFFFF;
`;


// button above chat component on main page
function LogoutButton() {
    return (
        <FlexButton
            onClick={() => {
                // log user out (and redirect to login)
            }}>
            <Red>Logout</Red>
        </FlexButton>
    );
}

export default LogoutButton;