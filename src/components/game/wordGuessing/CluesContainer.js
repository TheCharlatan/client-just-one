import React from 'react';
import Form from "../../../views/design/customized-layouts/Form";
import Red from "../../../views/design/font-families/Red";
import FormContainer from "../../../views/design/customized-layouts/FormContainer";
import Label from "../../../views/design/customized-layouts/Label";
import Violet from "../../../views/design/font-families/Violet";
import styled from "styled-components";
import InputField from "../../../views/design/customized-layouts/InputField";

const ClueLabel = styled(Label)`
    margin-bottom:2%;
    display:table;
    border-width:3px;
    margin-top:2%;
`;
// The container that holds the clues.
export class CluesContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormContainer
                style={{
                    minHeight: "0",
                    width: "100%",
                    marginBottom:"2%"
                }}
            >
                <Form style={{ width: "auto", height: "auto" ,borderWidth:"3px"}}>
                    <ClueLabel><Red>Clues 1</Red></ClueLabel>
                </Form>
            </FormContainer>
        );
    }
}