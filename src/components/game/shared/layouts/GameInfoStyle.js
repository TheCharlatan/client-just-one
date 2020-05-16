import styled from "styled-components";


export const GameInfo = styled.div`
width: 263px;
position: absolute;
top: 0px;
right: 0px;

display: flex;
flex-direction: column;
line-height: 0px;

background: #F8E7D1;
border: 13px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const GameInfoLabel = styled.div`
width: 100%; 
height: 45px;

background: #F8E7D1;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

text-align:center;
z-index: 10;
`;

export const InfoLabel = styled.div`
width: 100%;
height: 45px;

background: white;
border: 6px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
`;

export const Info = styled.div`
width: 100%;
height: 45px;

background: white;
border: 6px solid #F8E7D1;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
z-index: 9;
`;