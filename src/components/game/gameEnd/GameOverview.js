import React from 'react';
import FinishButton from "./FinishButton";
import {withRouter} from "react-router-dom";


// The end of game overview.
class GameOverview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <FinishButton/>
        );
    }
}
export default withRouter(GameOverview);