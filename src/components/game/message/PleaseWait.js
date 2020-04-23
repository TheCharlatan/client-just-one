import Red from "../../../views/design/font-families/Red";
import React from "react";
import Form from "../../../views/design/customized-layouts/Form";
import FormContainer from "../../../views/design/customized-layouts/FormContainer";
import Green from "../../../views/design/font-families/Green";


// one of the buttons in the middle part of lobby page
export class PleaseWait extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormContainer
                style={{
                    minHeight: "0",
                    width: "100%"
                }}
            >
                <Form style={{ width: "auto", height: "auto" ,borderWidth:"3px", marginTop:"10%"}}>
                    <Green>Please Wait. {this.props.keyword} entered</Green>
                </Form>
            </FormContainer>
        );
    }
}

