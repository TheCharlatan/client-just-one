import React from 'react';
import styled from 'styled-components';
import {BaseContainer, CenterContainer} from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
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
width: 280px;

font-family: fantasy;
font-style: normal;
font-weight: normal;
font-size: 18px;
letter-spacing: 0.41em;
color: #00A6EC;
text-stroke: 2px #006AAE;
-webkit-text-stroke: 2px #006AAE;

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

const LabelRegistration = styled(Label)`
width: 280px;
margin-right: 15px;
`;

const ButtonRegistration = styled(Button)`
margin-left: 20px;
margin-right: 20px;
`;

const Select = styled.select`
  width: 280px;
  height: 38px;
  background: #FFFFFF;
  border: 6px solid #F8E7D1;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
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

const Message = styled.span`
height: 38px;
margin-left: 5px;


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
    constructor() {
        super();
        this.state = {
            name: null,
            username: null,
            password: null,
            repeat_password:  null,
            birthDay: null,
            gender: null,
            country: null,

        };

    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                birthDay: this.state.birthDay,
                gender: this.state.gender,
                country: this.state.country
            });

            /**
             * only register the user but after success go back to the login window
             */
            const response = await api.post('/user', requestBody);
            console.log(response);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
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
    checkPassword: boolean;
    check() {

        if(document.getElementById('password').value ===
            document.getElementById('confirm_password').value) {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = 'matching';
            this.checkPassword = true;

        }
        else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'not matching';
            this.checkPassword = false;

        }
    }

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <CenterContainer>
                    <FormContainerRegistration>
                        <ProfilePictureContainer>
                            <EditProfilePictureButton/>
                        </ProfilePictureContainer>
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>username</Blue>
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
                                <Blue>password</Blue>
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
                        <FormRegistration>
                            <LabelRegistration>
                                <Blue>repeat password</Blue>
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
                            <Message id='message'> </Message>
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

/*
<FormContainerRegistration>
                        <ProfilePictureContainerRegistration>
                            <EditProfilePictureButton/>
                        </ProfilePictureContainerRegistration>
                                <LabelRegistration>
                                    <Blue> username </Blue>
                                    <Blue> name </Blue>
                                    <Blue> password </Blue>
                                    <Blue> repeat password </Blue>
                                    <Blue> birthday </Blue>
                                    <Blue> gender </Blue>
                                    <Blue> country </Blue>
                                </LabelRegistration>
                                <FormRegistration>
                                <InputFieldRegistration
                                    placeholder="..."
                                    onChange={e => {
                                        this.handleInputChange('username', e.target.value);
                                    }}
                                />

                                <InputFieldRegistration
                                    placeholder="..."
                                    onChange={e => {
                                        this.handleInputChange('name', e.target.value);
                                    }}
                                />

                                <InputFieldRegistration
                                    id = "password"
                                    type = "password"
                                    placeholder="..."
                                    onChange={e => {
                                        this.handleInputChange('password', e.target.value);
                                        this.check();
                                    }}

                                />

                                <InputFieldRegistration
                                    id = "confirm_password"
                                    type = "password"
                                    placeholder="..."
                                    onChange={e => {
                                        this.handleInputChange('repeat_password', e.target.value);
                                        this.check();
                                    }}
                                />


                                <InputFieldRegistration
                                    placeholder="DD/HH/YYYY"
                                    onChange={e => {
                                        this.handleInputChange('birthday', e.target.value);
                                    }}
                                />


                                <Select onChange={e => {this.handleChange('gender', e.target.value);}}>
                                    <option value='${null}' hidden>
                                        ...
                                    </option>
                                    <option value="female"> female </option>
                                    <option value="male"> male </option>
                                </Select>


                                <InputFieldRegistration
                                    placeholder="..."
                                    onChange={e => {
                                        this.handleInputChange('country', e.target.value);
                                    }}
                                />
                            </FormRegistration>
                        <Message id="message"> </Message>
                        <ButtonContainer>
                            <ButtonRegistration
                                disabled={!this.state.username || !this.state.password || !this.state.repeat_password}
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
 */