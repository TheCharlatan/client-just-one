import React from "react";
import Label from "../../../views/design/customized-layouts/Label";
import Pink from "../../../views/design/font-families/Pink";
import Blue from "../../../views/design/font-families/Blue";
import close from '../../../img/close.png'
import User from "../../shared/models/User";
import InviteModalBtn from "./InviteModalBtn";
import {api} from '../../../helpers/api';
import {Spinner} from "../../../views/design/Spinner";

export default class InviteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loaded:false
        }
    }

    componentWillReceiveProps(props) {
        const { friends } = this.props;
        if (props.friends !== friends) {
            this.invitePlayerList(props.friends);
        }
    }

    async invitePlayerList (invitedPlayers)
    {
        console.log(invitedPlayers);
        let responseInvite = null;
        let requestHeader = null;
        try {
            requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            responseInvite = await api.get('/user', {headers: {'X-Auth-Token': requestHeader}});
            //TODO check response status
        } catch {
            console.log("Ooops 2");
            return;
        }
        let users = [];
        if (responseInvite.data && responseInvite.data.length > 0) {
            responseInvite.data.map(user => {
                    if (!invitedPlayers.includes(user.id) && user.status === "ONLINE" && user.lobbyId <= 0)
                    {
                        users.push(new User(user))
                    }
                }
            );
            this.setState({
                users: users
            });
        } else {
            this.setState({
                users: []
            });
        }
        this.setState({loaded:true});
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        if (!this.state.loaded) {
            return <Spinner />
        }
        return (
            <div className="modal" style={{top: "20%", height: 'auto', maxHeight: '600px', overflowY: 'auto'}}>
                <div style={{marginBottom: '8%', marginTop: '8%'}}>
                    <Pink style={{fontSize: "x-large", fontSizeImportant: "true"}}>
                        Invite Players
                        <img onClick={() => this.props.hideModal()} style={{
                            cursor: 'pointer',
                            height: '16px',
                            float: 'right',
                            marginRight: '5px',
                            marginTop: '-5px'
                        }} src={close} />
                    </Pink>
                </div>
                {this.state.users.map((user, index) => {
                    return (
                        <React.Fragment>
                            <div className="pull-right" obj={user} key={index} id={user.id}
                                 style={{width: "100%", marginBottom: '5%', marginTop: '2%', lineHeight: "0px"}}>
                                <Label className="modal-label" key={"label"+user.id} style={{height: "45px"}}>
                                    <Blue key={"blue"+user.id}>{user.username}</Blue>
                                </Label>
                                <InviteModalBtn key={user.id} id={user.id}/>
                            </div>
                        </React.Fragment>);
                })}
                {this.state.users.length === 0 &&
                <React.Fragment>
                    <Blue>
                        No available online players to invite.
                    </Blue>
                </React.Fragment>
                }
            </div>
        );
    }
}