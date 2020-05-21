import React from 'react';
import {Background, BaseContainer, BottomLeftContainer, CenterContainer, ChatContainer} from '../../helpers/layout';
import ChatButton from "./ChatButton";
import StartGameBtn from "./StartGameBtn";
import LeaveBtn from "./LeaveBtn";
import InviteBtn from "./InviteBtn";
import {withRouter} from 'react-router-dom';
import Chat from "../chat/Chat";
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";
import Heading from "../../views/design/customized-layouts/Heading.js";
import Pink from "../../views/design/font-families/Pink";
import InviteModal from "./invite/InviteModal";
import {api, handleError} from "../../helpers/api";
import {ActionContainer, CenterContainerLobby, UserContainer} from "./LobbyLayout";

import {Spinner} from "../../views/design/Spinner";
import UserLayoutLobby from "./UserLayoutLobby";

export class Lobby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            playerIds: [],
            lobbyModel: null,
            lobbyName: null,
            hostPlayerId: null,
            users: [],
            loaded: false,
            updateTimer: null,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.startGame = this.startGame.bind(this);
        this.updateLobby = this.updateLobby.bind(this); // TODO: Stop when player joins game.
        this.leaveLobby = this.leaveLobby.bind(this);
    }

    showModal() {
        this.setState({
            show: true,
        });
    }

    hideModal() {
        this.setState({
            show: false,
        });
    }

    async componentDidMount() {
        let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
        try {
            const response = await api.get(`/lobby/${sessionStorage.getItem('lobbyId')}`, {headers: {'X-Auth-Token': requestHeader}});
            if (response.data == null) {
                alert("Unexpected error when loading lobby.");
                return;
            }
            if (response.data.name)
                this.setState({
                    lobbyName: response.data.name
                });
            if (response.data.playerIds && response.data.playerIds.length > 0) {
                this.setState({
                    playerIds: this.state.playerIds.concat(response.data.playerIds)
                })
            }
            if (response.data.hostPlayerId)
                this.setState({hostPlayerId: response.data.hostPlayerId});
        } catch (error) {
            alert(`An error occurred when retrieving lobby players: ${error}`);
            return;
        }

        // get the users to show them in the lobby
        try {
            for (let i = 0; i < this.state.playerIds.length; i++) {
                const responseUser = await api.get(`/user/${this.state.playerIds[i]}`, {headers: {'X-Auth-Token': requestHeader}});
                //make a new field which indicates if the user is the host or not
                responseUser.data.isHost = responseUser.data.id === this.state.hostPlayerId;
                this.state.users[i] = responseUser.data;
            }
        } catch (error) {
            alert(`Something went wrong while fetching the users: ${error}`);
        }

        this.setState({loaded: true});
        this.setState({updateTimer: setInterval(() => this.updateLobby(), 500)})
    }

    async startGame() {
        let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
        if (this.state.hostPlayerId != sessionStorage.getItem('userId')) {
            alert("Only the lobby host is allowed to start the game.");
            return;
        }
        if (this.state.playerIds == null || this.state.playerIds.length < 3) {
            alert("Not enough players to start the game.")
            return;
        }

        try {
            const requestBody = JSON.stringify({
                playerIds: this.state.playerIds
            });
            await api.post(`/game/`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        } catch (error) {
            alert(`An error occurred when starting a new game: ${error}`);
            return;
        }
    }

    leaveLobby = async () => {
        let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
        await api.delete(`lobby/${sessionStorage.getItem('lobbyId')}`,
            {headers: {'X-Auth-Token': requestHeader}, data: sessionStorage.getItem('userId'), params:{browserClose:false}})
            .then(r => {
                sessionStorage.removeItem("lobbyId");
                this.props.history.push(`/mainpage`);

            });
    }

    async updateLobby() {
        if(!sessionStorage.getItem("lobbyId")){
            return;
        }
      
        let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');

        try {
            const response = await api.get(`/user/${sessionStorage.getItem('userId')}`, {headers: {'X-Auth-Token': requestHeader}});

            if (response.data && response.data.gameId) {
                sessionStorage.setItem("gameId", response.data.gameId);
                this.props.history.push(`/game/${response.data.gameId}`);
            }
        }
        catch (error) {
            alert(`An error occurred when starting a new game: ${handleError(error)}`);
        }

        try {
            const response = await api.get(`/lobby/${sessionStorage.getItem('lobbyId')}`, {headers: {'X-Auth-Token': requestHeader}});
            if (response.data == null) {
                alert("Unexpted Error");
            }

            if (response.data.playerIds && response.data.playerIds.length > 0) {
                this.setState({
                    playerIds: response.data.playerIds
                })
            }
        } catch (error) {
            alert(`An error occurred when retrieving lobby players: ${error}`);
        }

        // get the users to show them in the lobby
        try {
            let users = []
            for (let i = 0; i < this.state.playerIds.length; i++) {
                const responseUser = await api.get(`/user/${this.state.playerIds[i]}`, {headers: {'X-Auth-Token': requestHeader}});
                //make a new field which indicates if the user is the host or not
                responseUser.data.isHost = responseUser.data.id === this.state.hostPlayerId;
                users.push(responseUser.data)
            }
            this.setState({users: users})
        }
        catch (error) {
            alert(`Something went wrong while fetching the users: ${error}`);
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.updateTimer);
        this.setState({updateTimer: null});
    }

    render() {
        if (this.state.loaded === false) {
            return <Spinner/>
        }

        return (
            <BaseContainer>
                <Background/>
                <BottomLeftContainer>
                    <ChatButton/>
                </BottomLeftContainer>
                <ChatContainer style={{gridArea: "1 / 1 / 3 / 2"}}>
                    <Chat chatEndpoint={`${sessionStorage.getItem('lobbyId')}`}/>
                </ChatContainer>
                <CenterContainer>
                    <ActionContainer>
                        <FormContainer style={{minHeight: "0", marginTop: "20px"}}>
                            <Heading>
                                <Pink style={{fontSize: "x-large", fontSizeImportant: "true"}}>
                                    {this.state.lobbyName}
                                </Pink>
                            </Heading>
                        </FormContainer>
                        <FormContainer
                            style={{
                                minHeight: "0",
                                width: "60%",
                                widthImportant: "true",
                                marginTop: "1em",
                            }}
                        >
                            <Form style={{width: "auto", height: "auto"}}>
                                <StartGameBtn onClick={() => this.startGame()}/>
                                <InviteBtn onClick={() => this.showModal()}/>
                                <LeaveBtn onClick={() => this.leaveLobby()}/>
                            </Form>
                        </FormContainer>
                        <InviteModal hideModal={this.hideModal} show={this.state.show}/>
                    </ActionContainer>
                    <UserContainer>
                        {this.state.users.map((user) => {
                            return (<UserLayoutLobby user={user} key={user.id} history={this.props.history}/>);
                        })}
                    </UserContainer>
                </CenterContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Lobby);
