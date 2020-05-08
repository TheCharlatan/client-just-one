import React from 'react';
import FormContainer from "../../../views/design/customized-layouts/FormContainer";
import Form from "../../../views/design/customized-layouts/Form";
import Red from "../../../views/design/font-families/Red";
import Blue from "../../../views/design/font-families/Blue";
import Yellow from "../../../views/design/font-families/Yellow";


// The box overlapping the default screen with the info how the round went.
export class TurnEndScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let message = null;

        if (this.props.correct == "correct") {
            message = <Red>Hurray! {this.props.activeUser.username} guessed correctly.</Red>
        }
        else if (this.props.correct == "wrong") {
            message = <Blue>Ohh, {this.props.activeUser.username} guessed wrong.</Blue>
        }
        else {
            message = <Yellow>{this.props.activeUser.username} skipped the guess.</Yellow>
        }

        return (
            <FormContainer
                style={{
                    minHeight: "0",
                    width: "100%"
                }}
            >
                <Form
                    style={{
                        width: "auto",
                        height: "auto",
                        borderWidth: "3px",
                        marginTop: "10%"
                    }}
                >
                    {message}
                </Form>
            </FormContainer>
        );
    }
}