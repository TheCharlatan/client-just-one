import React from "react";
import Label from "../../views/design/customized-layouts/Label";
import InputField from "../../views/design/customized-layouts/InputField";
import Button from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import Green from "../../views/design/font-families/Green";
import Violet from "../../views/design/font-families/Violet";
import {api, errorBox, handleError} from "../../helpers/api";
import styled from "styled-components";
import {withRouter} from "react-router-dom";
import AlertModal from "../game/shared/AlertModal";

export class CreateLobbyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lobbyname: null,
      showError: false, // modal window for alert when player closes the browser unexpectedly.
      errorMessage : null
    }
    this.showErrorModal = this.showErrorModal.bind(this);
    this.hideErrorModal = this.hideErrorModal.bind(this);
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

  async createLobby()
  {
    const userId = sessionStorage.getItem('userId');
    const requestBody = JSON.stringify({
      name: this.state.lobbyname,
      hostPlayerId : userId
    });
    let requestHeader = null;
    let response = null;

    try {
      requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
      response = await api.post('/lobby', requestBody, {headers: {'X-Auth-Token': requestHeader}});

    }
    catch(error) {
      console.log(`Something went wrong during the creating the lobby: \n${handleError(error)}`);
      let message_2=errorBox(error);
      this.showErrorModal(message_2);
      return;
    }
    try {
      requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
      // TODO: Replace userId with name of user id (if stored in sessionStorage).
      response = await api.get(`/user/${sessionStorage.getItem('userId')}`, {headers: {'X-Auth-Token': requestHeader}});
    }
    catch(error) {
      console.log(`Something went wrong during the retrieving the lobby: \n${handleError(error)}`);
      let message_2=errorBox(error);
      this.showErrorModal(message_2);
      return;
    }
    this.props.hideModal();
    sessionStorage.setItem("lobbyId",response.data.lobbyId);
    this.props.history.push(`/lobby/${response.data.lobbyId}`);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
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
      if(!this.state.lobbyname || this.state.showError)
      {
        return;
      }
      this.createLobby();
    }
  }

  render() {
    if (!this.props.show) {
      return null;
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
      <div className="modal" >
        {alertBox}
        <div className="pull-right" style={{ width: "100%" }}>
          <Label className="modal-label" style={{width: "auto", lineHeight: "0px"}}>
            <Violet>Lobby Name</Violet>
          </Label>
          <InputFieldCreateLobby className="modal-input" onChange={e => {
            this.handleInputChange("lobbyname", e.target.value);
          }}/>
        </div>
        <div className="pull-right" style={{ width: "100%" }}>
          <Button
            style={{ width: "30%", marginLeft: "auto", marginRight: "10px" }}
            onClick={() => this.props.hideModal()}
          >
            <Red>Cancel</Red>
          </Button>
          <Button
              style={{ width: "30%", marginRight: "auto" }}
              onClick={ () => {this.createLobby();}}
          >
            <Green>Create</Green>
          </Button>
        </div>
      </div>
    );
  }
}

const InputFieldCreateLobby = styled(InputField)`
font-family: helvetica;
font-style: normal;
font-weight: 900;
font-size: 18px;
letter-spacing: 0.41em;
color: #82278E;
text-stroke: 2px #710070;
-webkit-text-stroke: 2px #710070;

text-transform: uppercase;
`;

export default withRouter(CreateLobbyModal);