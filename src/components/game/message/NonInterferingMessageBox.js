import React from "react";
import Form from "../../../views/design/customized-layouts/Form";
import FormContainer from "../../../views/design/customized-layouts/FormContainer";
import Blue from "../../../views/design/font-families/Blue";


// small message box at the top of the page, requires no interaction and disappears after 4s
export class NonInterferingMessageBox extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // remove itself after 4s
        setTimeout(() => {
            let messageBox = document.getElementById('nonInterferingMessageBox');
            messageBox.parentNode.removeChild(messageBox);
        }, 4000);
    }

    render() {
        return (
            <div
                id="nonInterferingMessageBox"
                 style={{position: "absolute", width: "100%", textAlign: "center"}}
            >
                <FormContainer
                    style={{
                        display: "inline-block",
                        top: "20px",
                        height: "auto"
                    }}
                >
                    <Form style={{ width: "auto", height: "auto", borderWidth: "3px"}}>
                        <Blue>{this.props.message}</Blue>
                    </Form>
                </FormContainer>
            </div>
        );
    }
}