import React from 'react';
import Blue from "../../../views/design/font-families/Blue";
import styled from "styled-components";


export function LeaderboardUserElement(props) {

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
border: 6px solid #F8E7D1;
boxSizing: border-box;
boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


const UserNameContainer = styled.button`
background: none;
border: none;
text-align: left;
`;