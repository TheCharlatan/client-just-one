import React from "react";
import {withRouter} from "react-router-dom";
import LeaveButton from "./LeaveButton";
import styled from "styled-components";
import TutorialPage1 from "../../img/TutorialPage1.PNG"
import TutorialPage2 from "../../img/TutorialPage2.PNG"
import TutorialPage3 from "../../img/TutorialPage3.PNG"
import {BaseContainer} from "../../helpers/layout";

class Tutorial extends React.Component {
        render() {
        return (
            <BaseContainer style={{backgroundColor: "#F8E7D1", overflowY: "scroll"}}>
                    <LeaveButtonContainer>
                        <LeaveButton history={this.props.history}/>
                    </LeaveButtonContainer>
                    <TutorialContainer >
                        <TutorialPage1Container/>
                        <TutorialPage2Container/>
                        <TutorialPage3Container/>
                    </TutorialContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Tutorial);

const LeaveButtonContainer = styled.div`
grid-area: 1 / 1 / 2 / 2;
`;

const TutorialContainer = styled.div`
grid-area: 1 / 1 / 3 / 3;
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin: auto;
`;

const TutorialPage1Container = styled.div`
display: block;
margin-left: auto;
margin-right: auto;

width: 660px;
height: 929px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

background-repeat: no-repeat;
background-size: 660px 929px;

background-image: url(${TutorialPage1});
`;
const TutorialPage2Container = styled.div`
display: block;
margin-left: auto;
margin-right: auto;

width: 1301px;
height: 928px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

background-repeat: no-repeat;
background-size: 1301px 928px;

background-image: url(${TutorialPage2});
`;
const TutorialPage3Container = styled.div`
display: block;
margin-left: auto;
margin-right: auto;

width: 660px;
height: 929px;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

background-repeat: no-repeat;
background-size: 660px 929px;

background-image: url(${TutorialPage3});
`;