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
            display : 'invite'
        };
        this.inviteFriend = this.inviteFriend.bind(this);
    }

    async inviteFriend() {
//TODO toggle commit
        let requestHeader = null;
        const lobbyId = localStorage.getItem("lobbyId");

        const requestBody = JSON.stringify({
            invitation:lobbyId
        });
        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            await api.put(`/user/${this.state.friendId}/invitation`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        } catch {
            console.log("invite friend unexpected error");
            return;
        }

        this.setState({
            enabled: false,
            display:'sent'
        });
    }

    async componentDidMount() {

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


