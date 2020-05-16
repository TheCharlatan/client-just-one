import React from 'react';
import styled from 'styled-components';
import Pink from "../../../views/design/font-families/Pink";
import Form from "../../../views/design/customized-layouts/Form";

export const StyledMessage = styled(Form)`
flex-direction: column;

width: auto;
height: auto
border-width: 3px;
margin-top: 10%;
`;

export const MysteryWord = styled(Pink)`
width: auto;
height: 38px;

display: flex;
align-items: center;
justify-content: center;

background: #FFFFFF;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
`;

