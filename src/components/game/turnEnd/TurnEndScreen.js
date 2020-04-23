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
        return (
            <FormContainer
                style={{
                    minHeight: "0",
                    width: "100%"
                }}
            >
                <Form style={{width: "auto", height: "auto", borderWidth: "3px", marginTop: "10%"}}>
                    {(this.props.correct && this.props.correct == "correct") ?
                        (<Red>Huraay !!! {this.props.activeuser.name} guessed correctly. {}</Red>) :
                        (this.props.correct && this.props.correct == "wrong") ?
                            (<Blue>Ohh, {this.props.activeuser.name} - Bad Guess</Blue>) :
                            (<Yellow>{this.props.activeuser.name} skipped the guess</Yellow>)}
                </Form>
            </FormContainer>
        );
    }
}