import styled from "styled-components";
import {BaseContainer} from "../../../../helpers/layout";

export const BaseContainerGame = styled(BaseContainer)`
display: grid;
grid-template-columns: 263px repeat(2, 1fr) 263px;
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
`;

export const TopCenterContainer = styled.div`
grid-area: 1 / 2 / 2 / 4;
display: flex;
align-items: center;
justify-content: center;

`;

export const CardStacksContainer = styled.div`
grid-area: 1 / 2 / 3 / 3;

display: flex;
flex-direction: column;

align-items: center;
justify-content: center;
`;

export const CardGuessedContainer = styled.div`
grid-area: 1 / 3 / 3 / 4;

display: flex;
flex-direction: column;

align-items: center;
justify-content: center;
`;

export const GameInfoContainer = styled.div`
grid-area: 1 / 4 / 3 / 5;
`;

export const GameUserLeftContainer = styled.div`
grid-area: 2 / 1 / 5 / 2;
display: flex;
flex-direction: column;
flex-wrap: wrap;

align-items: center;
justify-content: center;
`;

export const GameUserRightContainer = styled.div`
grid-area: 2 / 4 / 5 / 5;
display: flex;
flex-direction: column;
flex-wrap: wrap;

align-items: center;
justify-content: center;
`;

export const ChangeElementContainer = styled.div`
grid-area: 5 / 1 / 2 / 5;
display: flex;
flex-direction: row;
flex-wrap: wrap;

align-items: center;
justify-content: center;
`;