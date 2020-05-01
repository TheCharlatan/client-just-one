import React from "react";
import {api, handleError} from "../../helpers/api";
import {BaseContainer, CenterContainer} from "../../helpers/layout";
import ProfilePictureContainer from "../../views/design/customized-layouts/ProfilePictureContainer";
import ButtonContainer from "../../views/design/customized-layouts/ButtonContainer";
import styled from "styled-components";
import Form from "../../views/design/customized-layouts/Form";
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Label from "../../views/design/customized-layouts/Label";
import Button from "../../views/design/Button";

import Blue from "../../views/design/font-families/Blue";
import Red from "../../views/design/font-families/Red";

import lion from "../../img/lion.png";
import dog from "../../img/dog.png";
import elephant from "../../img/elephant.png";
import giraffe from "../../img/giraffe.png";
import penguin from "../../img/penguin.png";
import squirrel from "../../img/squirrel.png";
import hippo from "../../img/hippo.png";
import tiger from "../../img/tiger.png";
import profilePlaceholder from "../../img/profilePlaceholder.png";

import {Spinner} from "../../views/design/Spinner";



export class UserProfile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            userData: null,
        }
    }


    async componentDidMount() {
        const {userProfileId} = this.props.parentProps.match.params;

        let userData = null;

        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let response = await api.get(`/user/${userProfileId}`, {headers: {'X-Auth-Token': requestHeader}});
            userData = response.data;
        }
        catch (error) {
            alert(`Something went wrong while fetching the user data: \n${handleError(error)}`);
            return;
        }

        if (userData !== null && userData.birthDay !== null) {
            if (userData.birthDay instanceof Date && !isNaN(userData.birthDay)) {
                userData.birthDay = new Date(userData.birthDay);
            }
            else {
                userData.birthDay = null; // invalid date
            }
        }

        if (userData !== null && userData.gender !== null) {
            if (userData.gender == 'f') {
                userData.gender = 'Female';
            }
            else if (userData.gender == 'm') {
                userData.gender = 'Female';
            }
            else {
                userData.gender = null; // if not saved on server, it gets set to char with id 0
            }
        }

        this.setState({userData: userData});
    }


    render() {

        if (this.state.userData === null) {
            return <Spinner />
        }

        let url = null;
        switch (this.state.userData.image) {
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

        let button = null;
        if (localStorage.getItem("userId") == this.state.userData.id) {
            button = (
                <ButtonContainer>
                <EditButton
                    width="50%"
                    onClick={() => {this.props.parentProps.history.push(`/user/${localStorage.getItem('userId')}/edit`);}}
                >
                    <Red>
                        Edit
                    </Red>
                </EditButton>
            </ButtonContainer>
            );
        }

        return (
            <BaseContainer>
                <Button
                    onClick={() => {this.props.parentProps.history.push(`/mainpage`);}}
                >
                    <Red>
                        Back
                    </Red>
                </Button>
                <CenterContainer>
                    <FormContainer>
                        <ProfilePictureContainer style={{'backgroundImage': `url(${url})`}} />
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Username
                                </Blue>
                            </ProfileLabel>
                            <ProfileLabel>
                                <Blue>
                                    {this.state.userData.username}
                                </Blue>
                            </ProfileLabel>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Name
                                </Blue>
                            </ProfileLabel>
                            <ProfileLabel>
                                <Blue>
                                    {this.state.userData.name}
                                </Blue>
                            </ProfileLabel>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Birthday
                                </Blue>
                            </ProfileLabel>
                            <ProfileLabel>
                                <Blue>
                                    {this.state.userData.birthDay}
                                </Blue>
                            </ProfileLabel>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Gender
                                </Blue>
                            </ProfileLabel>
                            <ProfileLabel>
                                <Blue>
                                    {this.state.userData.gender}
                                </Blue>
                            </ProfileLabel>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Country
                                </Blue>
                            </ProfileLabel>
                            <ProfileLabel>
                                <Blue>
                                    {this.state.userData.country}
                                </Blue>
                            </ProfileLabel>
                        </InvisibleForm>
                        {button}
                    </FormContainer>
                </CenterContainer>
            </BaseContainer>
        );
    }
}


const InvisibleForm = styled(Form)`
border:none;
background: none;
box-shadow: none;
grid-area: input;
margin: 10px 0px;
padding-top: 15px;
`;

const ProfileLabel = styled(Label)`
width: 280px;
margin: 0px 20px;
`;

const EditButton = styled(Button)`
margin-left: 20px;
margin-right: 20px;
width: 200px;
`;