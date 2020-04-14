import React from 'react';
import styled from 'styled-components';
import Pink from "../../../views/design/font-families/Pink";


// <MysteryWordContainer mysteryWord={this.state.gameModel.words[this.status.gameModel.wordIndex]}/>

export function MysteryWordContainer(props) {

    return (
        <WordBox>
            <Pink style={{lineHeight: "initial", margin: "0.5em"}}>
                Mystery Word:<br />{props.mysteryWord}
            </Pink>
        </WordBox>
    );
}


// TODO: Position it properly (box will fit for content if nothing is interfering).
let WordBox = styled.div`
border-radius: 2px;
text-align: center;

display: inline-block;
background: #F8E7D1;
border: 3px solid #DDC18E;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;