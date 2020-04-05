import React from 'react';
import {BaseContainer, CenterContainer, ChatContainer, LeaderboardContainer} from '../../helpers/layout';

import { withRouter } from 'react-router-dom';
import Chat from "../chat/Chat";
import Leaderboard from "../leaderboard/Leaderboard";
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";
import CreateLobbyButton from "./CreateLobbyButton"
import JoinLobbyButton from "./JoinLobbyButton"
import TutorialButton from "./TutorialButton"


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

    constructor() {
        super();
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
                <ChatContainer>
                    <Chat/>
                </ChatContainer>
                <CenterContainer>
                    <FormContainer>
                        <Form>
                            <CreateLobbyButton/>
                            <JoinLobbyButton/>
                            <TutorialButton/>
                        </Form>
                    </FormContainer>
                </CenterContainer>
                <LeaderboardContainer>
                    <Leaderboard/>
                </LeaderboardContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(MainPage);