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
import InputField from "../../views/design/customized-layouts/InputField";
import Orange from "../../views/design/font-families/Orange";
import {
    DogContainer,
    ElephantContainer,
    GiraffeContainer,
    HippoContainer,
    LionContainer, PenguinContainer, SquirrelContainer, TigerContainer
} from "../registration/ImageContainerContent";
import {ChooseImageContainer} from "../registration/ImageContainer";
import EditProfilePictureButton from "../../views/design/customized-layouts/EditProfilePictureButton";


export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            edit: false,
            showHiddenElement: false
        }
    }


    async componentDidMount() {
        this.setState({edit: this.props.edit});
        const {userProfileId} = this.props.parentProps.match.params;
        this.loadUserData(userProfileId);
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        this.setState({
            userData: {
                ...this.state.userData,
                [key]: value,
            },
        });

        console.log(this.state.userData);
    }

    async saveModifiedUser() {
        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            await api.put(`/user/${sessionStorage.getItem('userId')}/edit`, this.state.userData, {headers: {'X-Auth-Token': requestHeader}});
        } catch (error) {
            console.log(`An error occurred when saving the modified changes to profile: \n${handleError(error)}`);
            return;
        }
        this.loadUserData(sessionStorage.getItem('userId'));
        console.log(this.state.userData);
    }

    async loadUserData(userProfileId) {
        let userData;
        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            let response = await api.get(`/user/${userProfileId}`, {headers: {'X-Auth-Token': requestHeader}});
            userData = response.data;
        } catch (error) {
            alert(`Something went wrong while fetching the user data: \n${handleError(error)}`);
            return;
        }
        if (userData !== null && userData.birthDay !== null) {
            userData.birthDay = userData.birthDay.substring(0,10);
        }
        this.setState({userData: userData});
        console.log(userData);
    }


    chooseProfileImages(value) {
        let url;
        switch (value) {
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
                url = null;
        }
        document.getElementById("profilePicture").style.backgroundImage = `url(${url})`;
        this.setState({'showHiddenElement': false});
        this.handleInputChange("image", value);
    }

    showProfileImages() {
        if (this.state.showHiddenElement === false) {
            this.setState({'showHiddenElement': true});
        } else {
            this.setState({'showHiddenElement': false});
        }
    }

    render() {

        if (this.state.userData === null) {
            return <Spinner/>
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
          
        if (sessionStorage.getItem("userId") == this.state.userData.id) {
            if (this.state.edit === true) {
                button = (
                    <ButtonContainer>
                        <FormButton
                            width="50%"
                            onClick={() => {
                                this.props.parentProps.history.push(`/user/${sessionStorage.getItem('userId')}/`);
                            }}
                        >
                            <Red>
                                Cancel
                            </Red>
                        </FormButton>
                        <FormButton
                            width="50%"
                            onClick={() => {
                                this.saveModifiedUser().then(r => this.props.parentProps.history.push(`/user/${sessionStorage.getItem('userId')}/`));
                            }}
                        >
                            <Red>
                                Save
                            </Red>
                        </FormButton>
                    </ButtonContainer>);
            } else {
                button = (
                    <ButtonContainer>
                        <FormButton
                            width="50%"
                            onClick={() => {
                                this.props.parentProps.history.push(`/user/${sessionStorage.getItem('userId')}/edit`);
                            }}
                        >
                            <Red>
                                Edit
                            </Red>
                        </FormButton>
                    </ButtonContainer>);
            }
        }

        return (
            <BaseContainer style={{marginTop: '0'}}>
                <Button
                    onClick={() => {
                        this.props.parentProps.history.push(`/mainpage`);
                    }}
                >
                    <Red>
                        Back
                    </Red>
                </Button>
                <ChooseImageContainer style={{display: this.state.showHiddenElement ? 'flex' : 'none'}}
                                      id={"hiddenProfileImages"}>
                    <LionContainer
                        value={"lion"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <DogContainer
                        value={"dog"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <ElephantContainer
                        value={"elephant"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <GiraffeContainer
                        value={"giraffe"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <HippoContainer
                        value={"hippo"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <SquirrelContainer
                        value={"squirrel"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <TigerContainer
                        value={"tiger"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                    <PenguinContainer
                        value={"penguin"}
                        onClick={e => {
                            this.chooseProfileImages(e.target.value)
                        }}
                    />
                </ChooseImageContainer>
                <CenterContainer>
                    <FormContainer>
                        <ProfilePictureContainer id={"profilePicture"}>
                            {this.state.edit
                                ? <EditProfilePictureButton
                                    onClick={() => {
                                        this.showProfileImages()
                                    }}
                                />
                                : null
                            }
                        </ProfilePictureContainer>
                        <InvisibleForm className="tooltip">
                            <ProfileLabel>
                                <Blue>
                                    Username
                                </Blue>
                            </ProfileLabel>
                            <ProfileInput
                                value={this.state.userData.username || ''}
                                disabled
                            >
                            </ProfileInput>
                            {this.state.edit
                                ? <div className="tooltiptext"><Orange style={{lineHeight: "1.6", fontSize:'14px', letterSpacing:'0.31em'}}>Username cannot be
                                    changed.</Orange></div>
                                : null
                            }
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Name
                                </Blue>
                            </ProfileLabel>
                            <ProfileInput
                                value={this.state.userData.name || ''}
                                placeholder = {(this.state.edit) ? "..." : ""}
                                disabled={!this.state.edit}
                                onChange={e => {
                                    this.handleInputChange('name', e.target.value);
                                }}
                            >
                            </ProfileInput>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Birthday
                                </Blue>
                            </ProfileLabel>
                            <ProfileInput
                                value={this.state.userData.birthDay || ''}
                                placeholder = {(this.state.edit) ? "..." : ""}
                                type = {(this.state.edit) ? "date" : "text"}
                                disabled={!this.state.edit}
                                onChange={e => {
                                    this.handleInputChange('birthDay', e.target.value);
                                }}
                            >
                            </ProfileInput>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Gender
                                </Blue>
                            </ProfileLabel>
                            <Select
                                value={this.state.userData.gender || ''}
                                onChange={e => {
                                    this.handleInputChange('gender', e.target.value);
                                }}
                                style={{opacity:'initial'}}
                                disabled={!this.state.edit}
                            >
                                {(this.state.edit) ? <option value='${null}' hidden>
                                    ...
                                </option> : <option value='${null}' hidden>

                                </option>}
                                <option value='f'> female</option>
                                <option value='m'> male</option>
                            </Select>
                        </InvisibleForm>
                        <InvisibleForm>
                            <ProfileLabel>
                                <Blue>
                                    Country
                                </Blue>
                            </ProfileLabel>
                            <ProfileInput
                                value={this.state.userData.country || ''}
                                placeholder = {(this.state.edit) ? "..." : ""}
                                disabled={!this.state.edit}
                                onChange={e => {
                                    this.handleInputChange('country', e.target.value);
                                }}
                            >
                            </ProfileInput>
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
text-align:right;
`;

const ProfileInput = styled(InputField)`
width: 280px;

font-family: fantasy;
font-style: normal;
font-weight: normal;
font-size: 18px;
letter-spacing: 0.41em;
color: #00A6EC;
text-stroke: 2px #006AAE;
-webkit-text-stroke: 2px #006AAE;
margin: 0px 20px;
line-height:normal;
text-transform: uppercase;
&::placeholder {
    font-family: fantasy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    letter-spacing: 0.41em;
    color: #00A6EC;
    mix-blend-mode: darken;
    text-stroke: 2px #006AAE;
    -webkit-text-stroke: 2px #006AAE;
    
  }
 
`;

const Select = styled.select`
  width: 280px;
  height: 38px;
  background: #FFFFFF;
  border: 6px solid #F8E7D1;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0px 20px;
  padding-left: 5px;
  font-size: 18px;
    font-family: fantasy;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 0px;
    letter-spacing: 0.41em;
    text-transform: uppercase;
    font-feature-settings: 'cpsp' on, 'ss04' on;
    color: #00A6EC;
    text-stroke: 2px #006AAE;
    -webkit-text-stroke: 2px #006AAE;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    

  option {    
    display: flex;
    white-space: pre;
    min-height: 38px;
    padding: 0px 2px 1px;
    
    background: #FFFFFF;
    border: 6px solid #F8E7D1;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
  }
`;

const FormButton = styled(Button)`
margin-left: 20px;
margin-right: 20px;
width: 200px;
`;
