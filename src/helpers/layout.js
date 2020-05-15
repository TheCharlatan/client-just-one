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

  min-width: 100vw;
  height: 100vh; // needs set height for leaderboard
`;

/*Chat container on the left side of the grid*/
export const ChatContainer = styled.div`
/* defines the position in the grid */
grid-area: 2 / 1 / 3 / 2;
`;

/* center container of the grid which contains for example the menu bar */
export const CenterContainer = styled.div`
/* defines the position in the grid */
grid-area: 2 / 2 / 3 / 3;
`;

/*leaderboard container on the right side of the grid */
export const LeaderboardContainer = styled.div`
/* defines the position in the grid */
grid-area: 2 / 3 / 4 / 4;
`;

// container for top left part (logout button on main page)
export const TopLeftContainer = styled.div`
grid-area: 1 / 1 / 2 / 2;
`;

// container for top right part (profile button on main page)
export const TopRightContainer = styled.div`
grid-area: 1 / 3 / 2 / 4;
`;

// container for top left part (logout button on main page)
export const BottomLeftContainer = styled.div`
grid-area: 3 / 1 / 4 / 2;
`;