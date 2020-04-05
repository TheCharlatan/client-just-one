import React from 'react';
import styled from 'styled-components';

const Form = styled.div`

display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: auto;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  



background: #F8E7D1;
border: 13px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);


  /* &:hover {
    background: ${props => (props.shouldHover ? "red" : "none")};
    cursor:pointer;
  } */
`;
export default Form;