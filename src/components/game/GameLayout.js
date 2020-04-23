import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";


export const BaseContainerBody = styled.div`
min-width: 100vw;
min-height: 100vh;
`;

export const BaseContainerGame = styled(BaseContainer)`
display: grid;
grid-template-columns: 263px repeat(2, 1fr) 263px;
grid-template-rows: repeat(4, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;

min-width: 100vw;
min-height: 100vh;

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

export const UserGameContainer = styled.div`
grid-area: 3 / 1 / 5 / 5;
display: flex;
flex-direction: row;
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