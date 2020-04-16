import React from 'react';
import styled from "styled-components";

import Blue from "../../../views/design/font-families/Blue";

import dog from "../../../img/dog.png"
import lion from "../../../img/lion.png"
import elephant from "../../../img/elephant.png"
import giraffe from "../../../img/giraffe.png"
import hippo from "../../../img/hippo.png"
import penguin from "../../../img/penguin.png"
import squirrel from "../../../img/squirrel.png"
import tiger from "../../../img/tiger.png"
import Label from "../../../views/design/customized-layouts/Label";


export class UserStats extends React.Component{

    constructor(props) {
        super(props);
    }

    // TODO: Get individual user stats and avatar.
    render() {
        return (
            <div style={{marginBottom: '40px'}}>
                <div style={{width: '85px'}}>
                    <ImageContainer>
                        <img src={dog} style={{width: '100%', height: '100%', objectFit: 'object-over'}}/>
                    </ImageContainer>
                    <StatsLabel style={{margin: '0px 10px'}}>
                        <Blue style={{fontSize: 16, letterSpacing: '0.1em'}}>
                            {this.props.user.username}
                        </Blue>
                    </StatsLabel>
                </div>
                <StatsLabel>
                    <Blue style={{fontSize: 16, letterSpacing: '0.1em'}}>
                        x
                    </Blue>
                </StatsLabel>
                <StatsLabel>
                    <Blue style={{fontSize: 16, letterSpacing: '0.1em'}}>
                        x
                    </Blue>
                </StatsLabel>
                <StatsLabel>
                    <Blue style={{fontSize: 16, letterSpacing: '0.1em'}}>
                        x:xx
                    </Blue>
                </StatsLabel>
                <StatsLabel>
                    <Blue style={{fontSize: 16, letterSpacing: '0.1em'}}>
                        xx
                    </Blue>
                </StatsLabel>
            </div>
        );
    }
}


const ImageContainer = styled.div`
    margin: 0px 10px;
    width: 110px;
    height: 130px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: #F8E7D1;
    border: 2px solid black;
`;


const StatsLabel = styled.div`
width: 110px;
height: 37px;
margin: 20px 10px;

background: white;
border: 4px solid #DDC18E;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
text-align:center;
`;