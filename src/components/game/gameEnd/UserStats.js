import React from 'react';
import styled from "styled-components";


export class UserStats extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <p>Placeholder</p>
        );
    }
}


const ImageContainer = styled.div`
    width: 85px;
    height: 94px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #F8E7D1;
    
    background-repeat: no-repeat;
    background-size: 85px 94px;
    
    border: 2px solid black;
`;