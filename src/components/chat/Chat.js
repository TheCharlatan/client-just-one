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
            loadMessagesTimer: null,
            asyncLock: false
        };
        this.loadChatMessages = this.loadChatMessages.bind(this);
    }


    async componentDidMount() {
         try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            let response = await api.get(`chat/${this.props.chatEndpoint}`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({
                messages: response.data,
                loaded: true
            });
        }
        catch (error) {
            alert(`An error occurred when retrieving chat messages: ${handleError(error)}`);
            return;
        }
       
        // scroll to bottom of chat
        let chatElement = document.getElementById('chatMessagesContainer');
        chatElement.scrollTop = chatElement.scrollHeight;

       await api.post(`chatpoll/${this.props.chatEndpoint}`);
       let timer = setInterval(this.loadChatMessages, 1000);
       this.setState({loadMessagesTimer: timer});
    }


    componentWillUnmount() {
        clearInterval(this.state.loadMessagesTimer);
        this.setState({loadMessagesTimer: null});
    }


    async loadChatMessages() {
        if (this.state.asyncLock || this.state.loadMessagesTimer == null) {
            return;
        }

        this.setState({asyncLock: true});

        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            let response = await api.get(`chatpoll/${this.props.chatEndpoint}`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({
                messages: response.data,
                loaded: true
            });
        }
        catch (error) {
            this.setState({asyncLock: false});
            await this.loadChatMessages();
            return;
        }

        this.setState({asyncLock: false});

        if (this.state.messages.length > 0) {
            let height = document.getElementById('chatMessagesContainer').childNodes[0].offsetHeight;
            document.getElementById("chatMessagesContainer").scrollTop = this.state.messages.length*height;
        }
    }


    render() {
        
        if (!this.state.loaded) {
            return <Spinner />
        }

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: "100%", background: "#FFFFFF",  border: "8px solid #DDC18E", borderTop: "none", borderBottom: "none"}}>
                <ChatMessages id={'chatMessagesContainer'}>
                    {this.state.messages.map((message, index, messages) => {
                        let messageObject = messages[messages.length - 1 - index];
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
