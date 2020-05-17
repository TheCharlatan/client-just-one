import React from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import MainPage from "../../mainpage/MainPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class MainPageRouter extends React.Component {
    render() {
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() => <MainPage />}
                />

                <Route
                    exact
                    path={`${this.props.base}/mainpage`}
                    render={() => <MainPage />}
                />
            </Container>
        );
    }
}
/*
* Don't forget to export your component!
 */
export default MainPageRouter;
