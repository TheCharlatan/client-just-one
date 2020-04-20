import React from 'react';
import {BaseContainer, BottomLeftContainer, CenterContainer, ChatContainer} from '../../helpers/layout';
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
import {api} from "../../helpers/api";

export class Lobby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            playerIds : []
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
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

    componentDidMount() {
    }

    async startGame()
    {
        let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
        try {
            const response = await api.get(`/lobby/${localStorage.getItem('lobbyId')}`, {headers: {'Authorization': requestHeader}});
            let playerIds = [];
            if (response.data && response.data.playerIds && response.data.playerIds.length > 0) {
                response.data.playerIds.forEach(playerId => {
                    this.state.playerIds.push(playerId);
                });
            }
        } catch (error) {
            alert(`An error occurred when retrieving lobby players: ${error}`);
            return;
        }

        if(this.state.playerIds == null || this.state.playerIds.length < 3 )
        {
            alert("not enough players to start the game.")
            return;
        }

        try {
            const requestBody = JSON.stringify({
                playerIds:this.state.playerIds
            });
            const response = await api.post(`/game/`, requestBody, {headers: {'Authorization': requestHeader}});
        } catch (error) {
            alert(`An error occurred when starting a new game: ${error}`);
            return;
        }

        try {
            const response = await api.get(`/lobby/${localStorage.getItem('lobbyId')}` , {headers: {'Authorization': requestHeader}});

            if (response.data && response.data.gameId ) {
                localStorage.setItem("gameId",  response.data.gameId);
                this.props.history.push(`/game/${response.data.gameId}/`);
            }
        } catch (error) {
            alert(`An error occurred when starting a new game: ${error}`);
            return;
        }



    }


    render() {
        return (
            <BaseContainer>
                <BottomLeftContainer>
                    <ChatButton />
                </BottomLeftContainer>
                <ChatContainer style={{ gridArea: "1 / 1 / 3 / 2" }}>
                    <Chat />
                </ChatContainer>
                <CenterContainer>
                    <FormContainer style={{ minHeight: "0" }}>
                        <Heading>
                            <Pink style={{ fontSize: "x-large", fontSizeImportant: "true" }}>
                                Lobby Name
                            </Pink>
                        </Heading>
                    </FormContainer>
                    <FormContainer
                        style={{
                            minHeight: "0",
                            width: "60%",
                            widthImportnt: "true",
                            marginTop: "4em",
                        }}
                    >
                        <Form style={{ width: "auto", height: "auto" }}>
                            <StartGameBtn onClick={this.startGame}></StartGameBtn>
                            <InviteBtn onClick={() => this.showModal()}></InviteBtn>
                            <LeaveBtn></LeaveBtn>
                        </Form>
                    </FormContainer>
                    <InviteModal hideModal={this.hideModal} show={this.state.show} />
                </CenterContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Lobby);