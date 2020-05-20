import React from "react";
import Form from "../../../views/design/customized-layouts/Form";
import Green from "../../../views/design/font-families/Green";
import Label from "../../../views/design/customized-layouts/Label";


// one of the messages in the middle part of game page
export class PleaseWait extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Label style={{ marginTop: '15px', width: "60%", height: "auto", borderWidth:"3px", lineHeight: 'normal', background: '#F8E7D1'}}>
                <Green style={{textAlign:'center'}}>
                    Please Wait. {this.props.keyword} entered.
                </Green>
            </Label>
        );
    }
}

