import React from 'react';
import {
    Background,
    BaseContainer,
    BottomLeftContainer,
    CenterContainer,
    ChatContainer,
    LeaderboardContainer,
    TopLeftContainer,
    TopRightContainer
} from '../../helpers/layout';

import { withRouter } from 'react-router-dom';
import Chat from "../chat/Chat";
import Leaderboard from "./leaderboard/Leaderboard";
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";
import CreateLobbyButton from "./CreateLobbyButton"
import JoinLobbyButton from "./JoinLobbyButton"
import TutorialButton from "./TutorialButton"
import LogoutButton from "./LogoutButton";
import ChatButton from "./ChatButton";
import ProfileButton from "./ProfileButton";
import {LobbiesContainer} from "./lobbies/LobbiesContainer";
import CreateLobbyModal from "./CreateLobbyModal";
import {api, handleError} from "../../helpers/api";

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
export class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            openLobbies:[]
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.loadLobbies = this.loadLobbies.bind(this);
    }

    showModal() {
        let lobbiesContainer = document.getElementById("lobbiesContainer");
        if (lobbiesContainer.style.display === "block") {
            lobbiesContainer.style.display = "none";
        }
        this.setState({
            show: true
        });
    }

    hideModal() {
        this.setState({
            show: false
        });
    }

    async loadLobbies()
    {
        let requestHeader = null;
        let response = null;

        try {
            requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            response = await api.get('/lobby', {headers: {'X-Auth-Token': requestHeader}});
        }
        catch (error) {
            alert(`Could not load open lobbies: \n${handleError(error)}`);
            return;
        }
        // TODO: Validate data.
        if (response.data !== null && response.data.length > 0) {
            this.setState({
                openLobbies:response.data
            });
        }
        else {
            this.setState({
                openLobbies: []
            });
        }
        let lobbiesContainer = document.getElementById("lobbiesContainer");
        if (lobbiesContainer.style.display === "none") {
            lobbiesContainer.style.display = "block";
        }
        else {
            lobbiesContainer.style.display = "none";
        }
    }


    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <Background/>
                <TopLeftContainer>
                    <LogoutButton history={this.props.history}/>
                </ TopLeftContainer>
                <ChatContainer>
                    <Chat chatEndpoint={'1'}/>
                </ChatContainer>
                <BottomLeftContainer>
                    <ChatButton/>
                </BottomLeftContainer>
                <CenterContainer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <FormContainer style={{marginTop: 0}}>
                        <Form style={{width: "auto", height: "auto"}}>
                            <CreateLobbyButton onClick={() => this.showModal()}/>
                            <JoinLobbyButton loadLobbies={this.loadLobbies}/>
                            <TutorialButton history={this.props.history}/>
                        </Form>
                    </FormContainer>
                    <CreateLobbyModal hideModal={this.hideModal} createLobby={this.createLobby} show={this.state.show} />
                    <div id="lobbiesContainer" style={{display: "none"}}>
                        <LobbiesContainer openLobbies={this.state.openLobbies} history={this.props.history}/>
                    </div>
                </CenterContainer>
                <TopRightContainer>
                    <ProfileButton history={this.props.history}/>
                </TopRightContainer>
                <LeaderboardContainer>
                    <Leaderboard history={this.props.history}/>
                </LeaderboardContainer>

            </BaseContainer>
        );
    }
}


export default withRouter(MainPage);
