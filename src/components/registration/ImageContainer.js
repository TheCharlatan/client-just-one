import styled from "styled-components";


export const ChooseImageContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 25%;
    display: none;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 50px;
    background-color: #F8E7D1;
    width: 380px;
    height: 555px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 2px solid black;
    
    z-index: 1;
`;

export const ImageContainer = styled.button`
    margin-right: 22px;
    margin-left: 22px;
    width: 85px;
    height: 94px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #F8E7D1;
    
    background-repeat: no-repeat;
    background-size: 85px 94px;
    
    border: 2px solid black;
`;

