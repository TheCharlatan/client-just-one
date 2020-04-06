import React from 'react';
import {
    BaseContainer,
    BottomLeftContainer,
    CenterContainer,
    ChatContainer,
    LeaderboardContainer,
    TopLeftContainer,
    TopRightContainer
} from '../../helpers/layout';
import ChatButton from "./ChatButton";
import StartGameBtn from "./StartGameBtn";
import LeaveBtn from "./LeaveBtn";
import InviteBtn from "./InviteBtn";
import { withRouter } from 'react-router-dom';
import Chat from "../chat/Chat";
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";

export class Lobby extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {}


    render() {
        return (
            <BaseContainer>
            <BottomLeftContainer>
                    <ChatButton/>
                </BottomLeftContainer>
                <ChatContainer style={{gridArea: "1 / 1 / 3 / 2"}}>
                    <Chat/>
                </ChatContainer>
                <CenterContainer>
                    <FormContainer>
                        <Form style={{width: "auto", height: "auto"}}>
                            <StartGameBtn></StartGameBtn>
                            <InviteBtn></InviteBtn>
                            <LeaveBtn></LeaveBtn>
                        </Form>
                    </FormContainer>
                </CenterContainer>
            </BaseContainer>
        )}
}

export default withRouter(Lobby);