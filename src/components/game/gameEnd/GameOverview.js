import React from 'react';
import FinishButton from "./FinishButton";
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";


// The end of game overview.
class GameOverview extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        this.timerId = setTimeout(() => {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let requestBody = localStorage.getItem('userId');
            api.delete(`game/${localStorage.getItem('gameId')}`,
                requestBody,
                {headers:{'X-Auth-Token': requestHeader}})
                .then(r => this.props.history.push(`/lobby/${localStorage.getItem('lobbyId')}`));
        }, 20000);

        return (
          <FinishButton timerId={this.timerId}/>
        );
    }
}
export default withRouter(GameOverview);