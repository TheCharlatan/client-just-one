import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Red from "../../views/design/font-families/Red";
import React from "react";


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


// one of the buttons in the middle part of main page
function JoinLobbyButton() {
    return (
        <FlexButton
            onClick={() => {
                let lobbiesContainer = document.getElementById("lobbiesContainer");
                if (lobbiesContainer.style.display == "none") {
                    lobbiesContainer.style.display = "block";
                }
                else {
                    lobbiesContainer.style.display = "none";
                }
            }}>
            <Red>Join Lobby</Red>
        </FlexButton>
    );
}

export default JoinLobbyButton;