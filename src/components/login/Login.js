import React from 'react';
import styled from 'styled-components';
import {Background, BaseContainer, CenterContainer} from '../../helpers/layout';

import {api, errorBox, handleError} from '../../helpers/api';
import Token from '../shared/models/Token';
import { withRouter } from 'react-router-dom';
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";
import Pink from "../../views/design/font-families/Pink";
import InputField from "../../views/design/customized-layouts/InputField";
import Label from "../../views/design/customized-layouts/Label";
import Green from "../../views/design/font-families/Green";

import Button from "../../views/design/Button";
import ButtonContainer from "../../views/design/customized-layouts/ButtonContainer";
import toBinary from "./toBinary";
import AlertModal from "../game/shared/AlertModal";


const FormContainerLogin = styled(FormContainer)`
margin-top: 20%;
height: 315px;
line-height: 0px;

`;

const FormLogin = styled(Form)`
  width: 885px;
  height: 100%;
  padding-top: 20px;
`;

const InputFieldLogin = styled(InputField)`
font-family: helvetica;
font-style: normal;
font-weight: 900;
font-size: 18px;
letter-spacing: 0.41em;
color: #FF369D;
text-stroke: 2px #DE1E80;
-webkit-text-stroke: 2px #DE1E80;
text-transform: uppercase;

&::placeholder {
    font-family: helvetica;
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 0.41em;
    color: #FF369D;

    mix-blend-mode: darken;
    text-stroke: 2px #DE1E80;
    -webkit-text-stroke: 2px #DE1E80;
    
  }
`;

const LabelLogin = styled(Label)`
margin-right: 50px;
`;

const ButtonLogin = styled(Button)`
margin-right: 100px;
width: 272px;
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
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      password: null,
      username: null,
      showError: false, // modal window for alert when player closes the browser unexpectedly.
      errorMessage : null
    };
    this.showErrorModal = this.showErrorModal.bind(this);
    this.hideErrorModal = this.hideErrorModal.bind(this);
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end
   * and its token is stored in the sessionStorage.
   */
  async login() {
    try {

        const requestHeader = 'Basic ' + window.btoa(toBinary(this.state.username + ':' + this.state.password));

        const response = await api.get('/user/login', {headers: {'Authorization': requestHeader}});


      // Get the returned user and update a new object.
      const token = new Token(response.data);
      

      // Store the token into the local storage.
      sessionStorage.setItem('token', token.token);
      sessionStorage.setItem('userId', token.id);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      this.props.history.push(`/mainpage`);
    } catch (error) {
        console.log(`Something went wrong during the login: \n${handleError(error)}`);
        let message_2=errorBox(error);
        this.showErrorModal(message_2);
        return;
    }
  }

    //show the alert window
    showErrorModal(error) {
        this.setState({
            showError: true,
            errorMessage: error
        });
    }

    hideErrorModal() {
        this.setState({
            showError: false,
            errorMessage: null
        });
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
    // add key press event listener
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(!this.state.username || !this.state.password || this.state.showError)
            {
                return;
            }
            this.login();
        }
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
        let alertBox = null;
        if(this.state.showError)
        {
            alertBox = (
                <AlertModal
                    show={this.state.showError}
                    message_1={`Something went wrong during the login: `}
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
            <CenterContainer>
                <FormContainerLogin>
                    <FormLogin>
                        <LabelLogin>
                            <Pink>Username</Pink>
                        </LabelLogin>
                        <InputFieldLogin
                            placeholder="..."
                            onChange={e=>{this.handleInputChange('username', e.target.value);}}
                        />
                        <LabelLogin>
                            <Pink>password</Pink>
                        </LabelLogin>
                        <InputFieldLogin
                            type="password"
                            placeholder="..."
                            onChange={e=>{this.handleInputChange('password', e.target.value);}}
                        />
                    </FormLogin>
                </FormContainerLogin>

                <ButtonContainer>
                    <ButtonLogin
                        disabled={!this.state.username || !this.state.password}
                        width="50%"
                        onClick={()=>{this.login();}}
                    >
                        <Green> login </Green>
                    </ButtonLogin>
                    <ButtonLogin
                        width="50%"
                        onClick={()=>{this.props.history.push('/registration');}}
                    >
                        <Green> registration </Green>
                    </ButtonLogin>
                </ButtonContainer>
            </CenterContainer>
        </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
