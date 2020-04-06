import React from 'react';
import styled from 'styled-components';
import FormContainer from "../../views/design/customized-layouts/FormContainer";
import Form from "../../views/design/customized-layouts/Form";

class Chat extends React.Component {

    componentDidMount() {
        // get data from server
    }

    render() {
        return (
            // placeholder to visualize dimensions
            <div style={{height: "100%", background: "#F8E7D1",  border: "8px solid #DDC18E", borderTop:"none", borderBottom:"none"}}>
               
                <p style={{margin: 0}}>Chat Placeholder</p>
            </div>
        );
    }
}

export default Chat;