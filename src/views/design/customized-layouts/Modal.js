import React from "react";
import FormContainer from "./FormContainer";
import Form from "./Form";
import Label from "./Label";
import InputField from "./InputField";
import Button from ".././Button";
import Red from "../font-families/Red";
import Green from "../font-families/Green";
import Violet from "../font-families/Violet";
export default class Modal extends React.Component {
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
          <InputField className="modal-input"></InputField>
        </div>
        <div className="pull-right" style={{ width: "100%" }}>
          <Button
            style={{ width: "30%", marginLeft: "auto", marginRight: "10px" }}
            onClick={() => this.props.hideModal()}
          >
            <Red>Cancel</Red>
          </Button>
          <Button style={{ width: "30%", marginRight: "auto" }}>
            <Green>Create</Green>
          </Button>
        </div>
      </div>
    );
  }
}