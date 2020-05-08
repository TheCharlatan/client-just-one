import React from 'react';
import styled from 'styled-components';
import {api, handleError} from "../../../helpers/api";
import {Spinner} from "../../../views/design/Spinner";
import {LeaderboardUserElement} from "./LeaderboardUserElement";
import {LeaderboardThisUserElement} from "./LeaderboardThisUserElement";
import {LeaderboardControls} from "./LeaderboardControls";


class Leaderboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            leaderboardData: [],
            orderedDescending: true
        }
        this.orderLeaderboard = this.orderLeaderboard.bind(this);
    }


    async componentDidMount() {

        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let response = await api.get(`/user/scoreboard`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({
                leaderboardData: response.data
            });
        }
        catch (error) {
            alert(`An error occurred when retrieving leaderboard data: ${handleError(error)}`);
            return;
        }
    }


    orderLeaderboard() {
        let leaderboardCopy = this.state.leaderboardData;
        if (!this.state.orderedDescending) {
            leaderboardCopy.sort((user1, user2) => {return user2.score - user1.score;});
        }
        else {
            leaderboardCopy.sort((user1, user2) => {return user1.score - user2.score;});
        }
        this.setState({leaderboardData: leaderboardCopy, orderedDescending: !this.state.orderedDescending});
    }


    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <LeaderboardUsers style={{flex: 1, minHeight: '200px'}}>
                    {this.state.leaderboardData.map((user) => {
                        if (user.id == localStorage.getItem('userId')) {
                            return  <LeaderboardThisUserElement user={user} history={this.props.history}/>
                        }
                        return <LeaderboardUserElement user={user} history={this.props.history}/>
                    })}
                </LeaderboardUsers>
                <LeaderboardControls
                    orderFunction={this.orderLeaderboard}
                />
            </div>
        );
    }
}


export default Leaderboard;


const LeaderboardUsers = styled('div')`
margin-bottom: auto;
flex-direction: column;
background: white;
border: 13px solid #DDC18E;
boxSizing: border-box;
boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
overflow: auto;
`;