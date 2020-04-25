import React from 'react';
import styled from "styled-components";
import Label from "../../../views/design/customized-layouts/Label";
import Red from "../../../views/design/font-families/Red";
import Button from "../../../views/design/Button";
import {api} from "../../../helpers/api";


export class LobbiesList extends React.Component {

    constructor(props) {
        super(props);
    }

    joinLobby = async (lobbyId) => {
        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let requestBody = localStorage.getItem('userId');
            // TODO: Replace userId with name of user id (if stored in localStorage).
            await api.put(`/lobby/${lobbyId}`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        }
        catch (error) {
            alert("Could not join lobby:\nReason: " + error);
            return;
        }
        localStorage.setItem('lobbyId', lobbyId);
        this.props.history.push("/lobby/" + lobbyId);
    };

    render() {
        return (
            <Container>
                {this.props.lobbies.map((lobby) => {
                    return (
                        <LobbyContainer>
                            <Label style={{width: "300px"}} key={`nameLabel-${lobby.id}`}>
                                <Red key={`lobbyName-${lobby.id}`}>{lobby.name}</Red>
                            </Label>
                            <Button
                                style={{width: "160px", height: "38px"}}
                                key={`button-${lobby.id}`}
                                onClick={() => {this.joinLobby(lobby.id)}}>
                                <Red key={`joinLabel-${lobby.id}`}>Join</Red>
                            </Button>
                            <Label style={{width: "80px"}} key={`playerCountLabel-${lobby.id}`}>
                                <Red key={`playerCount-${lobby.id}`}>{lobby.playerIds.length}/7</Red>
                            </Label>
                        </LobbyContainer>
                    );
                })}
            </Container>
        );
    }
}


let Container = styled.div`
margin-top: 1em;
margin-left: 4em;
margin-right: 2em;
display: flex;
flex-direction: column;
align-items: left;
justify-content: center;
  
background: #F8E7D1;
box-sizing: border-box;
`;

let LobbyContainer = styled.div`
display: grid;
grid-template-columns: 300px 160px 80px;
grid-template-rows: auto;
grid-column-gap: 30px;

margin-bottom: 10px;

background: #F8E7D1;
box-sizing: border-box;
`;

let joinButton = styled(Button)`
width: 280px;
height: 38px;
`;