import React from "react";
import close from '../../../img/close.png'
import Red from "../../../views/design/font-families/Red";
import Yellow from "../../../views/design/font-families/Yellow";
import Blue from "../../../views/design/font-families/Blue";
import Button from "../../../views/design/Button";
import Green from "../../../views/design/font-families/Green";
import styled from "styled-components";

const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 40% !important;
  border: none;
  background : #DDC18E !important;
`;

export default class AlertModal extends React.Component {

    constructor(props) {
        super(props);
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            if(this.props.error === "true")
            {
                this.props.hideModal();
            }
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress, false);
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        let button = null;
        if(this.props.error === "true")
            button =
        <React.Fragment>
            <FlexButton
                onClick={this.props.hideModal}>
                <Red>OK</Red>
            </FlexButton>
        </React.Fragment>
        return (
            <div className="modal" style={{top: "20%", height: 'auto', maxHeight: '600px', overflowY: 'auto', paddingBottom:'20px'}}>
                <div>
                    <Red style={{lineHeight:"unset"}}>{this.props.message_1}</Red>
                </div>
                <div>
                    <Blue style={{lineHeight:"unset", fontWeight:'100', fontSize:'16px'}}>{this.props.message_2}</Blue>
                </div>
                {button}
            </div>
        );
    }
}