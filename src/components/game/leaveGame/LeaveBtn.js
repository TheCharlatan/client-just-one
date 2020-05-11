import React from "react";
import styled from "styled-components";
import {Button} from "../../../views/design/Button";
import Red from "../../../views/design/font-families/Red";
import {api} from "../../../helpers/api";
import {withRouter} from "react-router-dom";
import LeaveBtn from "../../lobby/LeaveBtn";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  width: 267px;
`;


class LeaveButton extends React.Component {
    constructor(props) {
        super(props);
    }

    leaveGame = async () => {
        this.props.clearTimer();
        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let requestBody =
                JSON.stringify({
                    'userId': localStorage.getItem("userId"),
                    'browserClose':false,
                    'lobbyId':localStorage.getItem("lobbyId")
                });
            let gameId = localStorage.getItem('gameId');
            localStorage.removeItem("gameId");
            await api.delete(`game/user/${gameId}`,  {headers: {'X-Auth-Token': requestHeader}, data: requestBody});
        } catch {
            console.log("fail");
        }
    }

    render() {
        return (
            <FlexButton
                onClick={() => {
                    this.leaveGame().then(this.props.history.push(`/lobby/${localStorage.getItem('lobbyId')}`));
                }}
            >
                <Red>Leave Game</Red>
            </FlexButton>
        );
    }
}
export default withRouter (LeaveButton);
