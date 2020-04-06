import styled from "styled-components";

export const Button = styled.button`
position: relative;
width: 100%; // scales (was 267px before for a column-width of 272px)
height: 45px;

background: #F8E7D1;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

align-items: center;
justify-content: center;
text-align:center;

&:hover:enabled {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.4);
  transform: translateY(-0.25em);
  cursor:pointer;
}
`;


export default Button;

