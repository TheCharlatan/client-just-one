import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
width: 263px;
height: 38px;
background: #F8E7D1;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
&:hover {
  background: lightyellow;
  cursor:pointer;
}
`;

export default ButtonContainer;