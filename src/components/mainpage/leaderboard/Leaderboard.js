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
            orderedDescending: true,
            updateTimer: null
        };
        this.updateLeaderboard = this.updateLeaderboard.bind(this);
        this.orderLeaderboard = this.orderLeaderboard.bind(this);
        this.scrollLeaderboardToLeader = this.scrollLeaderboardToLeader.bind(this);
        this.scrollLeaderboardToCurrentUser = this.scrollLeaderboardToCurrentUser.bind(this);
    }


    async componentDidMount() {
        await this.updateLeaderboard();
        let timer = setInterval(this.updateLeaderboard, 2000);
        this.setState({updateTimer: timer});
    }


    componentWillUnmount() {
        clearInterval(this.state.updateTimer);
        this.setState({updateTimer: null});
    }


    async updateLeaderboard() {
        try {
            let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
            let response = await api.get(`/user/scoreboard`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({
                leaderboardUsers: response.data
            });
        }
        catch (error) {
            alert(`An error occurred when retrieving leaderboard data: ${handleError(error)}`);
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