import React from "react";
import styled from "styled-components";
import {Button} from "../../../views/design/Button";
import Red from "../../../views/design/font-families/Red";
import {api} from "../../../helpers/api";
import {withRouter} from "react-router-dom";

const FlexButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 267px;
  
`;


class LeaveButton extends React.Component {

    constructor(props) {
        super(props);
    }

    async leaveGame() {
        this.props.clearTimer();
        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            let requestBody =
                JSON.stringify({
                    'userId': sessionStorage.getItem("userId"),
                    'browserClose':false,
                    'lobbyId':sessionStorage.getItem("lobbyId")
                });
            let gameId = sessionStorage.getItem('gameId');
            sessionStorage.removeItem("gameId");
            await api.delete(`game/user/${gameId}`,  {headers: {'X-Auth-Token': requestHeader}, data: requestBody});
        } catch {
            console.log("Some error occured when removing user from game.");
            return;
        }
    }

    render() {
        return (
            <FlexButton
                onClick={async () => {
                    await this.leaveGame();
                    this.props.history.push(`/lobby/${sessionStorage.getItem('lobbyId')}`);
                }}
            >
                <Red>Leave Game</Red>
            </FlexButton>
        );
    }
}
export default withRouter (LeaveButton);
