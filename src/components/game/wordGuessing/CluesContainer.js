import React from 'react';
import Form from "../../../views/design/customized-layouts/Form";
import Red from "../../../views/design/font-families/Red";
import FormContainer from "../../../views/design/customized-layouts/FormContainer";
import Label from "../../../views/design/customized-layouts/Label";
import styled from "styled-components";
import {api, handleError} from "../../../helpers/api";

const ClueLabel = styled(Label)`
    margin-bottom:2%;
    display:table;
    border-width:3px;
    margin-top:2%;
    height:28px;
`;

// The container that holds the clues.
export class CluesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameModel: null
        };
    }

    async componentDidMount() {
        let requestHeader = null;
        var gameId = localStorage.getItem("gameId");
        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            const response = await api.get(`/game/${gameId}`, {headers: {'X-Auth-Token': requestHeader}});
            console.log(response.data);
            this.setState({gameModel: response.data, users: []});
        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
    }

    render() {
        return (

            (this.state.gameModel && this.state.gameModel.clues && this.state.gameModel.clues.length > 0) ?
                (<FormContainer
                    style={{
                        minHeight: "0",
                        width: "100%",
                        marginBottom: "2%",
                        zIndex: 100,
                        marginTop: "15%"
                    }}
                >
                    <Form style={{width: "auto", height: "auto", borderWidth: "3px", display: "grid"}}>
                        {this.state.gameModel.clues.map((clue, id) => {
                            return (<ClueLabel key={id}><Red>{clue}</Red></ClueLabel>);
                        })}
                    </Form>
                </FormContainer>) : null
        );
    }
}