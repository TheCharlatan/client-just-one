import React from 'react';
import styled from 'styled-components';

import Yellow from "../../../views/design/font-families/Yellow";
import {LobbiesList} from "./LobbiesList";
import {api} from "../../../helpers/api";


export class LobbiesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openLobbies: [],
            invitedLobbies: []
        }
    }


    // load lobbies and fill in data
    async componentDidMount() {
        let requestHeader = null;
        let response = null;

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.get('/lobby', {headers: {'X-Auth-Token': requestHeader}});
        }
        catch {
            console.log("Ooops 1");
            return;
        }

        // TODO: Validate data.
        if (response.data && response.data.length > 0) {
            this.setState({
                openLobbies: response.data
            });
        }
        else {
            this.setState({
                openLobbies: []
            });
            return;
        }

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            // TODO: Replace userId with name of user id (if stored in localStorage).
            response = await api.get(`/user/${localStorage.userId}`, {headers: {'X-Auth-Token': requestHeader}});
        }
        catch {
            console.log("Ooops 2");
            return;
        }

        if (response.data && response.data.invitations && response.data.invitations.length > 0) {
            let invitedLobbies = [];
            this.state.openLobbies.forEach(lobby => {
                if (lobby.gameId in response.data.invitations) {
                    invitedLobbies.push(lobby)
                }
            });
            this.setState({
                invitedLobbies: invitedLobbies
            });
        }
        else {
            this.setState({
                invitedLobbies: []
            });
            return;
        }
    }


    render() {

        let lobbiesComponent;

        if (this.state.openLobbies.length > 0) {
            lobbiesComponent =
                <React.Fragment>
                    <Label>
                        <Yellow>Open Lobbies:</Yellow>
                    </Label>
                    <LobbiesList lobbies={this.state.openLobbies} history={this.props.history} />
                </React.Fragment>;
        }
        else {
            lobbiesComponent =
                <p style={{width: "200px"}}>There are no open lobbies. Please create a new one if you want to play.</p>
        }

        if (this.state.openLobbies.count > 0) {
            lobbiesComponent =
                <React.Fragment>
                    {lobbiesComponent}
                    <Label style={{marginTop: "15px"}}>
                        <Yellow>Invited To:</Yellow>
                    </Label>
                    <LobbiesList lobbies={this.state.invitedLobbies}  history={this.props.history} />
                </React.Fragment>;
        }

        return (
            <BorderContainer>
                {lobbiesComponent}
            </BorderContainer>
        );
    }
}


let BorderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: left;

width: min-content;
max-height: 55vh;
overflow-y: auto;

margin: 1em 8em;
padding: 1em;
border-radius: 5px;
  
background: #F8E7D1;
border: 13px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

let Label = styled.label`
width: 280px;
height: 38px;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
`;