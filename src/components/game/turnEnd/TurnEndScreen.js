import React from 'react';
import FormContainer from "../../../views/design/customized-layouts/FormContainer";
import Red from "../../../views/design/font-families/Red";
import Blue from "../../../views/design/font-families/Blue";
import Yellow from "../../../views/design/font-families/Yellow";
import {MysteryWord, StyledMessage} from "./StyleMessage";


// The box overlapping the default screen with the info how the round went.
export class TurnEndScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let message = null;

        if (this.props.correct == "correct") {
            message =
                <React.Fragment>
                    <Red>
                        Hurray! {this.props.activeUser.username} guessed
                    </Red>
                    <MysteryWord>
                        {this.props.mysteryWord}
                    </MysteryWord>
                    <Red>
                         correctly.
                    </Red>
                </React.Fragment>
        }
        else if (this.props.correct == "wrong") {
            message =
                <React.Fragment>
                    <Blue>
                        No! {this.props.activeUser.username} guessed
                    </Blue>
                    <MysteryWord>
                        {this.props.mysteryWord}
                    </MysteryWord>
                    <Blue>
                         wrong.
                    </Blue>
                </React.Fragment>
        }
        else {
            message =
                <React.Fragment>
                    <Yellow>
                        Ohh! {this.props.activeUser.username} skipped the word
                    </Yellow>
                    <MysteryWord>
                        {this.props.mysteryWord}
                    </MysteryWord>
                </React.Fragment>
        }

        return (
            <FormContainer
                style={{
                    minHeight: "0",
                    width: "100%",
                }}
            >
                <StyledMessage >
                    {message}
                </StyledMessage>

            </FormContainer>
        );
    }
}