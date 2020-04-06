import React from "react";
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";
import Label from "../../views/design/customized-layouts/Label";
import InputField from "../../views/design/customized-layouts/InputField";
import Button from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import Green from "../../views/design/font-families/Green";
import Violet from "../../views/design/font-families/Violet";
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
