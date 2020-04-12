import React from "react";
import Label from "../../views/design/customized-layouts/Label";
import Button from "../../views/design/Button";
import Pink from "../../views/design/font-families/Pink";
import Blue from "../../views/design/font-families/Blue";
import close from '../../img/close.png'
import Green from "../../views/design/font-families/Green";
import {api} from "../../helpers/api";
import User from "../shared/models/User";

export default class InviteModal extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let requestHeader = null;
        let response = null;

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.get('/user', {headers: {'X-Auth-Token': requestHeader}});
            //TODO check response status
            this.props.hideModal();
        } catch {
            console.log("Ooops 1");
            return;
        }

        if (response.data  && response.data.length > 0) {
            let users = [];
            response.data.map(item => {
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
        }
    }

    async inviteFriend(friendId) {

        let requestHeader = null;
        let response = null;

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.put(`/user/${friendId}/invitation`, {headers: {'X-Auth-Token': requestHeader}});
            //TODO check response status
            this.props.hideModal();
        } catch {
            console.log("invite friend unexpected error");
            return;
        }
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
                {this.state.users.map(function (object, i) {
                    return (
                        <React.Fragment>
                            <div className="pull-right" obj={object} key={i}
                                 style={{width: "100%", marginBottom: '5%', marginTop: '2%'}}>
                                <Label className="modal-label" style={{height: "45px"}}>
                                    <Blue>User 1</Blue>
                                </Label>
                                <Button className="modal-input"   onClick={() => this.inviteFriend(object.id)}><Green>Invite</Green></Button>
                            </div>
                        </React.Fragment>);
                })}
            </div>
        );
    }
}