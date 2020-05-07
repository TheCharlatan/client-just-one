import React from 'react';
import styled from 'styled-components';
import {api, handleError} from "../../../helpers/api";
import {Spinner} from "../../../views/design/Spinner";
import {LeaderboardUserElement} from "./LeaderboardUserElement";
import {LeaderboardThisUserElement} from "./LeaderboardThisUserElement";



class Leaderboard extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            leaderboardData: []
        }
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


    render() {

        return (
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <LeaderboardUsers>
                    {this.state.leaderboardData.map((user) => {
                        if (user.id == localStorage.getItem('userId')) {
                            return  <LeaderboardThisUserElement user={user} history={this.props.history}/>
                        }
                        return <LeaderboardUserElement user={user} history={this.props.history}/>
                    })}
                </LeaderboardUsers>
                <LeaderboardControls>
                    Placeholder
                </LeaderboardControls>
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

const LeaderboardControls = styled('div')`
`;