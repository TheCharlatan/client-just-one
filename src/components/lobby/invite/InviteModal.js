import React from "react";
import Label from "../../../views/design/customized-layouts/Label";
import Pink from "../../../views/design/font-families/Pink";
import Blue from "../../../views/design/font-families/Blue";
import close from '../../../img/close.png'
import User from "../../shared/models/User";
import InviteModalBtn from "./InviteModalBtn";

export default class InviteModal extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            users : []
        }
    }

    async componentDidMount() {
        /*let requestHeader= null;
        let responseLobby = null;

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            responseLobby = await api.get(`/user/${localStorage.getItem('lobbyId')}`, {headers: {'X-Auth-Token': requestHeader}});
            //TODO check response status
        } catch {
            console.log("Ooops 1");
            return;
        }
        let invitedPlayers = [];
        if (responseLobby.data && responseLobby.data.playerIds && responseLobby.data.playerIds.length > 0) {
            responseLobby.data.playerIds.map(playerId => {
                    invitedPlayers.push(playerId);
                }
            );
        }

        let responseInvite = null;

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            responseInvite = await api.get('/user', {headers: {'X-Auth-Token': requestHeader}});
            //TODO check response status
        } catch {
            console.log("Ooops 1");
            return;
        }
        let users = [];
        if (responseInvite.data  && responseInvite.data.length > 0) {
            responseInvite.data.map(user => {
                if(!invitedPlayers.includes(user.id))
                    users.push(new User(item))
                }
            );
            this.setState({
                users: users
            });
        }
        else {
            this.setState({
                users: []
            });
            return;
        }*/
        //TODO - mock users
        let users = [];
        users.push(this.mockUser('name2', 2));
        users.push(this.mockUser('name3', 3));
        users.push(this.mockUser('name4', 4));
        users.push(this.mockUser('name5', 5));
        this.setState({
            users: users
        });
    }

    mockUser(name, userid)
    {
        var user1 = new User();
        user1.name =name;
        user1.id = userid;
        return user1;
    }

    render() {
        if (!this.props.show) {
            return null;
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
                        }} src={close}/>
                    </Pink>
                </div>
                {this.state.users.map((user, index) => {
                    return (
                        <React.Fragment>
                            <div className="pull-right" obj={user} key={index}
                                 style={{width: "100%", marginBottom: '5%', marginTop: '2%'}}>
                                <Label className="modal-label" style={{height: "45px"}}>
                                    <Blue>User 1</Blue>
                                </Label>
                                <InviteModalBtn key={user.id} id={user.id}></InviteModalBtn>
                            </div>
                        </React.Fragment>);
                })}
            </div>
        );
    }
}