import React from 'react';
import styled from 'styled-components';
import {Background, BaseContainer, CenterContainer} from '../../helpers/layout';
import {api, errorBox, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";
import Label from "../../views/design/customized-layouts/Label";
import InputField from "../../views/design/customized-layouts/InputField";
import ButtonContainer from "../../views/design/customized-layouts/ButtonContainer";
import Button from "../../views/design/Button";
import ProfilePictureContainer from "../../views/design/customized-layouts/ProfilePictureContainer";
import EditProfilePictureButton from "../../views/design/customized-layouts/EditProfilePictureButton";
import Blue from "../../views/design/font-families/Blue";
import Yellow from "../../views/design/font-families/Yellow";
import {ChooseImageContainer} from "./ImageContainer";
import {
    DogContainer,
    ElephantContainer,
    GiraffeContainer,
    HippoContainer,
    LionContainer,
    PenguinContainer,
    SquirrelContainer,
    TigerContainer
} from "./ImageContainerContent";

import dog from "../../img/dog.png"
import lion from "../../img/lion.png"
import elephant from "../../img/elephant.png"
import giraffe from "../../img/giraffe.png"
import hippo from "../../img/hippo.png"
import penguin from "../../img/penguin.png"
import squirrel from "../../img/squirrel.png"
import tiger from "../../img/tiger.png"
import Green from "../../views/design/font-families/Green";
import Red from "../../views/design/font-families/Red";
import AlertModal from "../game/shared/AlertModal";


const FormRegistration = styled(Form)`
border:none;
background: none;
box-shadow: none;
grid-area: input;
margin: auto;
padding-top: 15px;

`;

const FormContainerRegistration = styled(FormContainer)`
display: flex;
flex-direction: column;    
margin: 0px;
`;

const InputFieldRegistration = styled(InputField)`
width: 300px;

font-family: helvetica;
font-style: normal;
font-weight: 900;
font-size: 18px;
letter-spacing: 0.41em;
color: #00A6EC;
text-stroke: 2px #006AAE;
-webkit-text-stroke: 2px #006AAE;
text-transform: uppercase;

line-height: normal;

&::placeholder {
    font-family: helvetica;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 0.41em;
    color: #00A6EC;
    mix-blend-mode: darken;
    text-stroke: 2px #006AAE;
    -webkit-text-stroke: 2px #006AAE;
    
  }
`;

const LabelRegistration = styled(Label)`
width: 350px;
margin-right: 15px;
line-height: 0px;
`;

const ButtonRegistration = styled(Button)`
margin-left: 20px;
margin-right: 20px;
width: 200px;
`;

const Select = styled.select`
  width: 300px;
  height: 38px;
  background: #FFFFFF;
  border: 6px solid #F8E7D1;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  padding-left: 5px;
  font-size: 18px;
    font-family: helvetica;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    
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

const Message = styled.div`
float:left;
height: 38px;
margin-left: 5px;
margin-top: 2px;
display:none;
width:fit-content;
padding:1%;
/* Position the tooltip */
  position: absolute;
  z-index: 1;
  left: 105%;
  margin-left: -60px;
  background-color: #F8E7D1;
    &:after {
    content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #F8E7D1 transparent transparent;
   
  } 
`;



/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Registration extends React.Component {

    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            username: null,
            password: null,
            repeat_password:  null,
            birthDay: null,
            gender: null,
            country: null,
            image: null,
            showHiddenElement: false,
            message : null,
            showError: false, // modal window for alert when player closes the browser unexpectedly.
            errorMessage : null
        };
        this.checkPassword = false;
        this.showErrorModal = this.showErrorModal.bind(this);
        this.hideErrorModal = this.hideErrorModal.bind(this);
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the sessionStorage.
     */
    async register() {
        //check if password length >= 8 otherwise alert
        if (this.state.password.length < 8) {
            let message_2='Please enter a password with 8 or more characters!';
            this.showErrorModal(message_2);
            return;
        } else {

            try {
                const requestBody = JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    name: this.state.name,
                    birthDay: this.state.birthDay,
                    gender: this.state.gender,
                    country: this.state.country,
                    image: this.state.image,
                });
                /**
                 * only register the user but after success go back to the login window
                 */
                await api.post('/user', requestBody);

                // Login successfully worked --> navigate to the route /game in the GameRouter
                this.props.history.push(`/login`);
            }
            catch (error) {
                console.log(`Something went wrong during the registration: \n${handleError(error)}`);
                let message_2=errorBox(error);
                this.showErrorModal(message_2);
            }
        }
    }

    //show the alert window
     showErrorModal(error) {
        this.setState({
            showError: true,
            errorMessage : error
        });
    }

    hideErrorModal() {
        this.setState({
            showError: false,
            errorMessage : null
        });
    }


    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(!this.state.username || !this.state.password || !this.state.repeat_password || this.checkPassword === false || this.state.showError)
            {
                return;
            }
            this.register();
        }
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    handleChange(key, value) {
        this.setState({[key]: value});
    }

    check() {
        if(document.getElementById('password').value === '' && document.getElementById('confirm_password').value=== '')
        {
            this.setState({message:null});
        }
        else if(document.getElementById('password').value ===
            document.getElementById('confirm_password').value) {
            this.setState({message:true});
            this.checkPassword = true;
        }
        else {
            this.setState({message:false});
            this.checkPassword = false;
        }
    }

    showProfileImages() {
        if(this.state.showHiddenElement === false){
            this.setState({['showHiddenElement'] : true});
            document.getElementById("hiddenProfileImages").style.display="flex";
        }
        else {
            this.setState({['showHiddenElement'] : false});
            document.getElementById("hiddenProfileImages").style.display="none";
        }
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
        document.getElementById("profilePicture").style.backgroundImage =`url(${url})`;
        this.setState({['showHiddenElement'] : false});
        document.getElementById("hiddenProfileImages").style.display="none";
        this.setState({["image"] : value});
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    render() {
        let message;
        if(this.state.message === true)
        {
            message = (<React.Fragment><Green>Matching</Green></React.Fragment>);
        }
        else if(this.state.message === false)
        {
            message = (<React.Fragment><Red>Not Matching</Red></React.Fragment>);
        }
        else{
            message = null;
        }

        let alertBox = null;
        if(this.state.showError)
        {
            alertBox = (
                <AlertModal
                    show={this.state.showError}
                    message_1={`Something went wrong during the registration: `}
                    message_2={`${this.state.errorMessage}`}
                    error = "true"
                    hideModal = {this.hideErrorModal}
                />
            );
        }

        return (
            <BaseContainer>
                <Background/>
                {alertBox}
                <ChooseImageContainer id={"hiddenProfileImages"}>
                    <LionContainer
                        value={"lion"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <DogContainer
                        value={"dog"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <ElephantContainer
                        value={"elephant"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <GiraffeContainer
                        value={"giraffe"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <HippoContainer
                        value={"hippo"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <SquirrelContainer
                        value={"squirrel"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <TigerContainer
                        value={"tiger"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                    <PenguinContainer
                        value={"penguin"}
                        onClick={e => {this.chooseProfileImages(e.target.value)}}
                    />
                </ChooseImageContainer>
                <CenterContainer>
                    <FormContainerRegistration>
                        <ProfilePictureContainer id={"profilePicture"}>
                            <EditProfilePictureButton
                                onClick={() => {this.showProfileImages()}}
                            />
                        </ProfilePictureContainer>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>username*</Blue>
                            </LabelRegistration>
                            <InputFieldRegistration
                                placeholder="..."
                                onChange={e => {
                                    this.handleInputChange('username', e.target.value);
                                }}
                            />
                        </FormRegistration>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>name</Blue>
                            </LabelRegistration>
                            <InputFieldRegistration
                                placeholder="..."
                                onChange={e => {
                                    this.handleInputChange('name', e.target.value);
                                }}
                            />
                        </FormRegistration>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>password*</Blue>
                            </LabelRegistration>
                            <InputFieldRegistration
                                id = "password"
                                type = "password"
                                placeholder="..."
                                onChange={e => {
                                    this.handleInputChange('password', e.target.value);
                                    this.check();
                                }}
                            />
                        </FormRegistration>
                        <FormRegistration className="tooltip">
                            <LabelRegistration>
                                <Blue>repeat password*</Blue>
                            </LabelRegistration>
                            <InputFieldRegistration
                                id = "confirm_password"
                                type = "password"
                                placeholder="..."
                                onChange={e => {
                                    this.handleInputChange('repeat_password', e.target.value);
                                    this.check();
                                }}
                            />
                            <Message id='message' style={{display: this.state.message === true || this.state.message === false ? 'block' : 'none'}}>{message}</Message>
                        </FormRegistration>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>birthday</Blue>
                            </LabelRegistration>
                            <InputFieldRegistration
                                type = "date"
                                onChange={e => {
                                    this.handleInputChange('birthDay', e.target.value);
                                }}
                            />
                        </FormRegistration>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>gender</Blue>
                            </LabelRegistration>
                            <Select onChange={e => {this.handleChange('gender', e.target.value);}}>
                                <option value='${null}' hidden>
                                    ...
                                </option>
                                <option value='f'> female </option>
                                <option value='m'> male </option>
                            </Select>
                        </FormRegistration>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>country</Blue>
                            </LabelRegistration>
                            <InputFieldRegistration
                                placeholder="..."
                                onChange={e => {
                                    this.handleInputChange('country', e.target.value);
                                }}
                            />
                        </FormRegistration>
                        <ButtonContainer>
                            <ButtonRegistration
                                disabled={!this.state.username || !this.state.password || !this.state.repeat_password || this.checkPassword === false}
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                <Yellow>register</Yellow>
                            </ButtonRegistration>
                            <ButtonRegistration
                                width="50%"
                                onClick={()=>{this.props.history.push('/login');}}
                            >
                                <Yellow> cancel </Yellow>
                            </ButtonRegistration>
                        </ButtonContainer>
                    </FormContainerRegistration>
                </CenterContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Registration);