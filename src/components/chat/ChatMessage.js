import React from 'react';
import styled from 'styled-components';


export function ChatMessage(props) {
    return (
        <ChatElement>
            <p style={{margin: '0'}}>
                <span style={{color: '#006AAE'}}>{props.message}</span>
                <br/>- {props.username}
            </p>
        </ChatElement>
    );
}


const ChatElement = styled('div')`
display: flex;
flexDirection: row;
overflow: auto;

margin: 5px;
padding: 0px 2px;

border: 4px solid #F8E7D1;
boxSizing: border-box;
boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;