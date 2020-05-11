import React from 'react';
import {api, handleError} from "../../helpers/api";
import styled from "styled-components";
import InputField from "../../views/design/customized-layouts/InputField";
import {Button} from "../../views/design/Button";


export function ChatInput(chatEndpoint) {
    return (
        <div>
            <input
                style={{border: '4px solid #F8E7D1', boxSizing: 'border-box', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}
                placeholder={'...'}
                id={'chatInput'}
            />
            <SubmitButton
                onClick={
                    async () => {
                        let message = document.getElementById('chatInput').value;
                        await submitMessage(chatEndpoint, message);
                    }
                }
            >
                <svg height="20" width="20" style={{margin: '2px'}}>
                    <polygon points="0,0 20,10 0,20" style={{fill: '#00BB37', stroke: 'black', strokeWidth: 1}} />
                </svg>
            </SubmitButton>
        </div>
    );
}


async function submitMessage(chatEndpoint, message) {

    let requestBody = JSON.stringify({
        message: message
    });

    try {
        let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
        await api.put(`${chatEndpoint}`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
    }
    catch (error) {
        alert(`An error occurred when retrieving chat messages: ${handleError(error)}`);
    }
}


const SubmitButton = styled(Button)`
width: auto;
height: auto;
border: 4px solid #DDC18E;
padding: 4px 2px 0px 2px;
`;