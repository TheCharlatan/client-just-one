import styled from "styled-components";
import {ImageContainer} from "./ImageContainer"
import dog from "../../img/dog.png"
import lion from "../../img/lion.png"
import elephant from "../../img/elephant.png"
import giraffe from "../../img/giraffe.png"
import hippo from "../../img/hippo.png"
import penguin from "../../img/penguin.png"
import squirrel from "../../img/squirrel.png"
import tiger from "../../img/tiger.png"


export const LionContainer = styled(ImageContainer)`
    background-image: url(${lion});
    
`;

export const DogContainer = styled(ImageContainer)`

    background-image: url(${dog});

`;

export const ElephantContainer = styled(ImageContainer)`

    background-image: url(${elephant});

`;

export const GiraffeContainer = styled(ImageContainer)`

    background-image: url(${giraffe});

`;

export const HippoContainer = styled(ImageContainer)`
 
    background-image: url(${hippo});
  
`;

export const SquirrelContainer = styled(ImageContainer)`
    
    background-image: url(${squirrel});
    
`;

export const TigerContainer = styled(ImageContainer)`
    background-image: url(${tiger});
    
`;

export const PenguinContainer = styled(ImageContainer)`
    background-image: url(${penguin});
`;