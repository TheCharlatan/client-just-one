import React from 'react';
import Blue from "../../../views/design/font-families/Blue";
import styled from "styled-components";


export function LeaderboardThisUserElement(props) {

    return (
        <UserElement>
            <div style={{flexGrow: 1}}>
                <UserNameContainer
                    onClick={() => {
                        props.history.push(`/user/${props.user.id}`);
                    }}
                >
                    <Blue style={{fontSize: '16px'}}>
                        {props.user.username}
                    </Blue>
                </UserNameContainer>
            </div>
            <Blue style={{fontSize: '16px'}}>
                {props.user.score}
            </Blue>
        </UserElement>
    );
}


const UserElement = styled('div')`
display: flex;
flexDirection: row;
background: #F8E7D1;
border: 6px solid #DDC18E;
boxSizing: border-box;
boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


const UserNameContainer = styled.button`
background: none;
border: none;
text-align: left;
`;