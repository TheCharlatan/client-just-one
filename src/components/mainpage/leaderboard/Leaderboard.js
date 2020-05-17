import React from 'react';
import styled from 'styled-components';
import {api, handleError} from "../../../helpers/api";
import {LeaderboardUserElement} from "./LeaderboardUserElement";
import {LeaderboardThisUserElement} from "./LeaderboardThisUserElement";
import {LeaderboardControls} from "./LeaderboardControls";


class Leaderboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            leaderboardUsers: [],
            orderedDescending: true
        };
        this.orderLeaderboard = this.orderLeaderboard.bind(this);
        this.scrollLeaderboardToLeader = this.scrollLeaderboardToLeader.bind(this);
        this.scrollLeaderboardToCurrentUser = this.scrollLeaderboardToCurrentUser.bind(this);
        /*
        // test data
        this.setState({
            leaderboardUsers: [
                {id: 1, username: 'user1', score: 1},
                {id: 2, username: 'user2', score: 2},
                {id: 3, username: 'user3', score: 3},
                {id: 4, username: 'user4', score: 4},
                {id: 5, username: 'user5', score: 5},
                {id: 6, username: 'user6', score: 6},
                {id: 7, username: 'user7', score: 7},
                {id: 8, username: 'user8', score: 8},
                {id: 9, username: 'user9', score: 9},
                {id: 10, username: 'user10', score: 10},
                {id: 11, username: 'user11', score: 11},
                {id: 12, username: 'user12', score: 12},
                {id: 13, username: 'user13', score: 13},
                {id: 14, username: 'user14', score: 14},
                {id: 15, username: 'user15', score: 15},
                {id: 16, username: 'user16', score: 16},
                {id: 17, username: 'user17', score: 17},
                {id: 18, username: 'user18', score: 18},
                {id: 19, username: 'user19', score: 19},
                {id: 20, username: 'user20', score: 20},
                {id: 21, username: 'user21', score: 21},
                {id: 22, username: 'user22', score: 22},
                {id: 23, username: 'user23', score: 23},
                {id: 24, username: 'user24', score: 24},
                {id: 25, username: 'user25', score: 25},
                {id: 26, username: 'user26', score: 26},
                {id: 27, username: 'user27', score: 27},
                {id: 28, username: 'user28', score: 28},
                {id: 29, username: 'user29', score: 29}
            ]
        });
         */
    }


    async componentDidMount() {

        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            let response = await api.get(`/user/scoreboard`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({
                leaderboardUsers: response.data
            });
        }
        catch (error) {
            alert(`An error occurred when retrieving leaderboard data: ${handleError(error)}`);
            return;
        }
    }


    orderLeaderboard() {
        let leaderboardCopy = this.state.leaderboardUsers;
        if (this.state.orderedDescending) {
            leaderboardCopy.sort((user1, user2) => {return user2.score - user1.score;});
        }
        else {
            leaderboardCopy.sort((user1, user2) => {return user1.score - user2.score;});
        }
        this.setState({leaderboardUsers: leaderboardCopy, orderedDescending: !this.state.orderedDescending});
    }


    scrollLeaderboardToLeader() {
        if (this.state.orderedDescending) {
            this.scrollLeaderboardToPosition(0);
        }
        else {
            this.scrollLeaderboardToPosition(this.state.leaderboardUsers.length);
        }
    }

    scrollLeaderboardToCurrentUser() {
        let index = this.state.leaderboardUsers.findIndex((user) => {return user.id == sessionStorage.getItem('userId')});
        this.scrollLeaderboardToPosition(index);
    }

    // scroll down the leaderboard to the positionNumberth user (in current ordering)
    scrollLeaderboardToPosition(positionNumber) {
        if (this.state.leaderboardUsers.length > 0) {
            let height = document.getElementById('leaderboard').childNodes[0].childNodes[0].offsetHeight;
            document.getElementById("leaderboardUsers").scrollTop = positionNumber*height;
        }
    }


    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}} id={'leaderboard'}>
                <LeaderboardUsers style={{flex: 1, minHeight: '200px'}} id={'leaderboardUsers'}>
                    {this.state.leaderboardUsers.map((user) => {
                        if (user.id == sessionStorage.getItem('userId')) {
                            return  <LeaderboardThisUserElement user={user} history={this.props.history}/>
                        }
                        return <LeaderboardUserElement user={user} history={this.props.history}/>
                    })}
                </LeaderboardUsers>
                <LeaderboardControls
                    orderFunction={this.orderLeaderboard}
                    scrollToLeaderFunction={this.scrollLeaderboardToLeader}
                    scrollToCurrentUserFunction={this.scrollLeaderboardToCurrentUser}
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