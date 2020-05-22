import {Button} from "../../../views/design/Button";
import Green from "../../../views/design/font-families/Green";
import React from "react";
import Violet from "../../../views/design/font-families/Violet";
import {api} from '../../../helpers/api';

export default class InviteModalBtn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            enabled : true,
            friendId : this.props.id,
        };
        this.alreadyInvited = this.alreadyInvited.bind(this);
        this.inviteFriend = this.inviteFriend.bind(this);
    }

    async componentDidMount(prevProps, prevState, snapshot) {
        this.alreadyInvited();
    }

    async alreadyInvited()
    {
        let requestHeader = null;
        try {
            requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            const responseFriend = await api.get(`/user/${this.state.friendId}`, {headers: {'X-Auth-Token': requestHeader}});
            if(responseFriend != null && responseFriend.data.invitations != null && responseFriend.data.invitations.length >0)
            {
                const lobbyId=sessionStorage.getItem("lobbyId");
                if(responseFriend.data.invitations.includes(parseInt(lobbyId)))
                {
                    this.setState({enabled:false});
                }
            }

        } catch {
            console.log("already invite friend unexpected error");
            return;
        }
        return true;
    }


    async inviteFriend() {
//TODO toggle commit
        let requestHeader = null;
        const lobbyId = sessionStorage.getItem("lobbyId");

        const requestBody = JSON.stringify({
            invitation:lobbyId
        });
        try {
            requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            await api.put(`/user/${this.state.friendId}/invitation`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        } catch {
            console.log("invite friend unexpected error");
            return;
        }
        this.setState({
            enabled: false,
        });
    }

    render() {
        const enabled = this.state.enabled;
        let text;
        if(enabled)
            text = <Green>Invite</Green>;
        else{
            text = <Violet>Sent</Violet>
        }
        return (
            <Button className="modal-input" disabled = {!this.state.enabled}
                    onClick={this.inviteFriend} >
                {text}
            </Button>
        );
    }
}


