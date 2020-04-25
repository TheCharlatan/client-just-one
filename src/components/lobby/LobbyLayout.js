import styled from "styled-components";
import {CenterContainer} from "../../helpers/layout";

export const CenterContainerLobby = styled(CenterContainer)`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
`;

export const ActionContainer = styled.div`
grid-area: 1 / 1 / 2 / 2;
`;

export const UserContainer = styled.div`
grid-area: 2 / 1 / 3 / 2;

margin: 20px;

display: flex;
flex-direction: row;
flex-wrap: wrap;

align-items: center;
justify-content: center;
`;
