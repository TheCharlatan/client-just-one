import React from 'react';
import { api, handleError } from '../../helpers/api';
import {Redirect, withRouter} from 'react-router-dom';
import {
    BaseContainerBody,
    BaseContainerGame,
    CardGuessedContainer,
    CardStacksContainer,
    GameInfoContainer,
    UserGameContainer
} from "./GameLayout"
import {GameInfo, GameInfoLabel, Info, InfoLabel} from "./GameInfoStyle";
import UserLayout from "./UserLayout";
import {CardStack, CardStackLabel, CardStackNumber} from "./GameCardStackStyle";

import {GameOverview} from "./gameEnd/GameOverview";
import {ClueInput} from "./clueSelection/ClueInput";
import {TurnEndScreen} from "./turnEnd/TurnEndScreen";
import {CluesContainer} from "./wordGuessing/CluesContainer";
import {GuessInput} from "./wordGuessing/GuessInput";


import {Spinner} from "../../views/design/Spinner";
import Red from "../../views/design/font-families/Red";
import Orange from "../../views/design/font-families/Orange";
import Yellow from "../../views/design/font-families/Yellow";



// The game component responsible for the conditional rendering.
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            gameModel: null,
            users: [],
            loaded: null,
        };
    }


    // TODO: Get gameId, userId (currently assumed it is in localStorage).
    async componentDidMount() {

        try {
            const response = await api.get(`/game/${localStorage.getItem('gameId')}`);
            this.setState({gameModel: response.data, users: []});

            for (let i=0; i<response.data.playerIds.length; i++) {
                const userResponse = await api.get('/user/' + response.data.playerIds[i]);

                //add a data field to user which shows if the user is the active player
                userResponse.data.isActivePlayer = userResponse.data.id === this.state.gameModel.activePlayer;

                if (userResponse.data.id === localStorage.getItem('userId')) {
                    this.setState({currentUser: userResponse.data});
                }
                this.state.users[i] = userResponse.data;
            }
            this.setState({loaded: 'loaded'});


        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }

    }


    isActivePlayer(playerId) {
        return playerId === this.state.gameModel.activePlayerId;
    }


    render() {
        // delay until all the information is loaded
        if(this.state.loaded === null) {
            return <Spinner />
        }

        // game has ended -> use separate screen
        if (this.state.gameModel.gameStatus === "GAME_OVER") {
            return <GameOverview gameModel={this.state.gameModel} users={this.state.users}/>;
        }


        // React component(s) that change depending on the game state.
        let changingElements = null;


        // elements needed to decide word
        if (this.state.gameModel.gameStatus === "AWAITING_INDEX") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                // set elements depending on if the player has to select a number or wait form word acceptation/rejection
                changingElements = <p>Placeholder</p>;
            }
            else {
                // set elements depending on if the word was already been selected or not
                changingElements = <p>Placeholder</p>;
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_CLUES") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                // display waiting message
                changingElements = <p>Placeholder for waiting message.</p>;
            }
            else {
                changingElements = <ClueInput />;
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_GUESS") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = (
                    <React.Fragment>
                        <CluesContainer />
                        <GuessInput />
                    </React.Fragment>
                );
            }
            else {
                // display waiting message
                changingElements = <p>Placeholder for waiting message.</p>;
            }
        }

        // if game turn ended, display game turn end screen
        // changingElements = <TurnEndScreen />


        return (
            // Basic layout that is (nearly) the same in all game states.
            <BaseContainerBody>
                <BaseContainerGame>

                    <GameInfoContainer>
                        <GameInfo>
                            <GameInfoLabel>
                                <Red>Game Info</Red>
                            </GameInfoLabel>
                            <InfoLabel>
                                <Orange>Correct</Orange>
                            </InfoLabel>
                            <Info>
                                <Orange>
                                    {this.state.gameModel.wordsGuessedCorrect}
                                </Orange>
                            </Info>
                            <InfoLabel>
                                <Orange>Wrong</Orange>
                            </InfoLabel>
                            <Info>
                                <Orange>
                                    {this.state.gameModel.wordsGuessedWrong}
                                </Orange>
                            </Info>
                        </GameInfo>
                    </GameInfoContainer>

                    <CardStacksContainer>
                        <CardStackLabel>
                            <Yellow>Stack</Yellow>
                        </CardStackLabel>
                        <CardStack/>
                        <CardStackNumber>
                            <Yellow>
                                {this.state.gameModel.cardStackCount}
                            </Yellow>
                        </CardStackNumber>
                    </CardStacksContainer>

                    <CardGuessedContainer>
                        <CardStackLabel>
                            <Yellow>Guessed</Yellow>
                        </CardStackLabel>
                        <CardStack/>
                        <CardStackNumber>
                            <Yellow>
                                {this.state.gameModel.cardGuessedCount}
                            </Yellow>
                        </CardStackNumber>
                    </CardGuessedContainer>

                    <UserGameContainer>
                        {this.state.users.map((user) => {
                            return (<UserLayout user={user} key={user.id} />);
                        })}
                    </UserGameContainer>

                    {changingElements}

                </BaseContainerGame>
            </BaseContainerBody>
        );
    }
}


export default withRouter(Game);