import React from "react";
import styled from "styled-components";
import Green from "../../../views/design/font-families/Green";
import {api, handleError} from "../../../helpers/api";


export function AcceptRejectButtons(props) {

    return (
        <div>
            <WordBox>
                <Green
                    style={{lineHeight: "initial", margin: "0.5em"}}
                    onClick={async () => {
                        try {
                            let requestBody = JSON.stringify({ wordIndex: props.wordIndex});
                            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
                            await api.put(`game/${localStorage.getItem('gameId')}/number`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
                        }
                        catch (error) {
                            alert(`Something went wrong: \n${handleError(error)}`);
                        }
                    }}
                >
                    Accept
                </Green>
            </WordBox>
            <WordBox>
                <Green
                    style={{lineHeight: "initial", margin: "0.5em"}}
                    onClick={async () => {
                        try {
                            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
                            await api.delete(`game/${localStorage.getItem('gameId')}/number`, {headers: {'X-Auth-Token': requestHeader}});
                        }
                        catch (error) {
                            alert(`Something went wrong: \n${handleError(error)}`);
                        }
                    }}
                >
                    Reject
                </Green>
            </WordBox>
        </div>
    );
}


// TODO: Position it properly (box will fit for content if nothing is interfering).
let WordBox = styled.button`
border-radius: 2px;
text-align: center;
margin: 10px;

background: #F8E7D1;
border: 3px solid #DDC18E;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;