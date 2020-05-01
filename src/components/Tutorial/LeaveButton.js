import React from "react";
import styled from "styled-components";
import {Button} from "../../views/design/Button";
import Violet from "../../views/design/font-families/Violet";


const FlexButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin: 10px;
  background: #FFFFFF;
`;


// one of the buttons in the middle part of main page
class LeaveButton  extends React.Component {
    render() {
        return (
            <FlexButton
                onClick={() => {
                    // redirect to tutorial
                    this.props.history.push("/mainpage");
                }}>
                <Violet>Leave</Violet>
            </FlexButton>
        );
    }
}

export default LeaveButton;