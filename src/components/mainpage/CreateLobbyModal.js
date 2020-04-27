import React from "react";
import Label from "../../views/design/customized-layouts/Label";
import InputField from "../../views/design/customized-layouts/InputField";
import Button from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import Green from "../../views/design/font-families/Green";
import Violet from "../../views/design/font-families/Violet";
import {api} from "../../helpers/api";
import styled from "styled-components";
import {withRouter} from "react-router-dom";

export class CreateLobbyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lobbyname: null,
    }
  }

  async createLobby()
  {
    const userId = localStorage.getItem('userId');
    const requestBody = JSON.stringify({
      name: this.state.lobbyname,
      hostPlayerId : userId
    });
    let requestHeader = null;
    let response = null;

    try {
      requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
      response = await api.post('/lobby', requestBody, {headers: {'X-Auth-Token': requestHeader}});
      if(response.status)
      this.props.hideModal();
    }
    catch {
      console.log("Ooops 1");
      return;
    }

    try {
      requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
      // TODO: Replace userId with name of user id (if stored in localStorage).
      response = await api.get(`/user/${localStorage.getItem('userId')}`, {headers: {'X-Auth-Token': requestHeader}});
    }
    catch {
      console.log("Ooops 2");
    }
    localStorage.setItem("lobbyId",response.data.lobbyId);
    this.props.history.push(`/lobby/${response.data.lobbyId}`);
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


  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal" >
        <div className="pull-right" style={{ width: "100%" }}>
          <Label className="modal-label">
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
font-family: fantasy;
font-style: normal;
font-weight: normal;
font-size: 18px;
letter-spacing: 0.41em;
color: #82278E;
text-stroke: 2px #710070;
-webkit-text-stroke: 2px #710070;
`;

export default withRouter(CreateLobbyModal);