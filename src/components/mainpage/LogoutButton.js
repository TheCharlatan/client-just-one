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

async function logout(token, userId) {
    await api.put(`/user/${userId}/logout`, 0,{headers: {'X-Auth-Token': token}});
    sessionStorage.clear();
}


// button above chat component on main page
export class LogoutButton extends React.Component {
    render()
    {
        return (
            <FlexButton
                onClick={() => {
                    // log user out (and redirect to login)
                    logout(sessionStorage.getItem("token"), sessionStorage.getItem("userId")).then(r => {
                        this.props.history.push("/login")
                    });
                }}>
                <Red>Logout</Red>
            </FlexButton>
        );
    }
}

export default LogoutButton;