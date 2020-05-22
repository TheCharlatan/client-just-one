import styled from "styled-components";
import FontBasic from "../../views/design/font-families/FontBasic";
import profilePlaceholder from "../../img/profilePlaceholder.png";
import lion from "../../img/lion.png";
import React from "react";
import dog from "../../img/dog.png";
import elephant from "../../img/elephant.png";
import giraffe from "../../img/giraffe.png";
import penguin from "../../img/penguin.png";
import squirrel from "../../img/squirrel.png";
import hippo from "../../img/hippo.png";
import tiger from "../../img/tiger.png";


const UserContainer = styled.div`
max-height: 162px;
min-width: 120px;
display: flex;
flex-direction: column;

align-items: center;
justify-content: center;
line-height: 0px;
`;

const UserNameContainer = styled.button`
width: 100%;
height: 37px;

text-align:center;

background: #FFFFFF;
border: 5px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const UserName = styled(FontBasic)`
font-size: 14px;
color: #82278E;

mix-blend-mode: darken;
text-stroke: 1px #710070;
-webkit-text-stroke: 1px #710070;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const UserProfilePicture = styled.button`
width: 96px;
height: 100px;
background-image: url(${props => props.image ? props.image : profilePlaceholder});
background-repeat: no-repeat;
background-size: 100% 100%;
background-color: #F8E7D1;

border: 2px solid black;
`;

const ActivePlayer = styled.div`
width: 120px;
height: 160px;

margin-left: 45px;
margin-right: 45px;

display: flex;
flex-direction: column;

align-items: center;
justify-content: center;

box-shadow: ${ props => props.isHost ? '4px 4px 12px rgba(0, 0, 0, 0.78)' : 'none'};

background: ${props => props.isHost ? 'radial-gradient(81.05% 81.05% at 50% 50%, #DDC18E 0%, #FFFFFF 100%)' : 'none'};
`;


const UserLayoutLobby = (props) => {

    let url;
    switch (props.user.image) {
        case "lion":
            url = lion;
            break;
        case "dog":
            url = dog;
            break;
        case "elephant":
            url = elephant;
            break;
        case "giraffe":
            url = giraffe;
            break;
        case "penguin":
            url = penguin;
            break;
        case "squirrel":
            url = squirrel;
            break;
        case "hippo":
            url = hippo;
            break;
        case "tiger":
            url = tiger;
            break;
        default:
            url = profilePlaceholder;
    }

    return (
        <ActivePlayer isHost={props.user.isHost}>
            <UserContainer>
                <UserProfilePicture
                    style={{cursor:"pointer"}}
                    image={url}
                    onClick={() => {
                        props.history.push(`/user/${props.user.id}`);
                    }}
                />
                <UserNameContainer
                    style={{cursor:"pointer"}}
                    onClick={() => {
                        props.history.push(`/user/${props.user.id}`);
                    }}
                >
                    <UserName> {props.user.username} </UserName>
                </UserNameContainer>
            </UserContainer>
        </ActivePlayer>
    );
};

export default UserLayoutLobby;