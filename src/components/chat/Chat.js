import React from 'react';
import styled from 'styled-components';
import {ChatMessage} from "./ChatMessage";
import {api, handleError} from "../../helpers/api";
import {Spinner} from "../../views/design/Spinner";
import {ChatInput} from "./ChatInput";



class Chat extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loaded: false,
            loadMessagesTimer: null
        }
        this.loadChatMessages = this.loadChatMessages.bind(this);
    }


    async componentDidMount() {
        await this.loadChatMessages();

        let timer = setInterval(this.loadChatMessages, 1000);
        this.setState({loadMessagesTimer: timer});

        // scroll to bottom of chat
        let chatElement = document.getElementById('chatMessagesContainer');
        chatElement.scrollTop = chatElement.scrollHeight;
    }


    async loadChatMessages() {
        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let response = await api.get(`${this.props.chatEndpoint}`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({
                messages: response.data,
                loaded: true
            });
        }
        catch (error) {
            alert(`An error occurred when retrieving chat messages: ${handleError(error)}`);
            return;
        }
    }


    render() {

        if (!this.state.loaded) {
            return <Spinner />
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: "100%", background: "#FFFFFF",  border: "8px solid #DDC18E", borderTop: "none", borderBottom: "none"}}>
                <ChatMessages id={'chatMessagesContainer'}>
                    {this.state.messages.map((messageObject) => {
                        return <ChatMessage message={messageObject.message} username={messageObject.username}/>
                    })}
                </ChatMessages>
                <ChatInput chatEndpoint={this.props.chatEndpoint}/>
            </div>
        );
    }
}


export default Chat;



const ChatMessages = styled('div')`
flex: 1;
flex-direction: column;
margin-bottom: auto;
background: white;
border: 13px solid #DDC18E;
boxSizing: border-box;
boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
overflow: auto;
`;