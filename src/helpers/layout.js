import styled from "styled-components";

//export const DESKTOP_WIDTH = 1160; //Old value from template
export const DESKTOP_WIDTH = 1366; //new width from assignment description
export const DESKTOP_HEIGHT = 768; // new height from assignment description
export const SMALL_LAPTOPS_WIDTH = 970;
export const TABLETS_WIDTH = 750;
export const SMALL_WIDTH = 768;

/* Base container with a 3 column and 3 row grid */
/* The footer and header are defined in the Header.js file */
export const BaseContainer = styled.div`
/*defines the grid of the page */
  display: grid;
grid-template-columns: 20% 60% 20%;
grid-template-rows: 5% 90% 5%;
grid-column-gap: 0px;
grid-row-gap: 0px;

  margin-left: auto;
  padding-left: 2px;
  margin-right: auto;
  padding-right: 2px;
  width: ${DESKTOP_WIDTH}px;
  height: ${DESKTOP_HEIGHT}px;
  
  
`;

/*Chat container on the left side of the grid*/
export const ChatContainer = styled.div`
/* defines the position in the grid */
grid-area: 2 / 1 / 3 / 2;
padding-left: 2px
padding-right: 2px


`;

/*leaderboard container on the right side of the grid */
export const LeaderboardContainer = styled.div`
/* defines the position in the grid */
grid-area: 2 / 3 / 3 / 4;
padding-left: 2px
padding-right: 2px


`;

/* center container of the grid which contains for example the menu bar */
export const CenterContainer = styled.div`
/* defines the position in the grid */
grid-area: 2 / 2 / 3 / 3;
padding-left: 2px
padding-right: 2px

`;
