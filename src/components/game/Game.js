import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {
    BaseContainerBody,
    BaseContainerGame,
    CardGuessedContainer,
    CardStacksContainer,
    ChangeElementContainer,
    GameInfoContainer,
    UserGameContainer
} from "./GameLayout"
import {GameInfo, GameInfoLabel, Info, InfoLabel} from "./GameInfoStyle";
import UserLayout from "./UserLayout";
import {CardStack, CardStackLabel, CardStackNumber} from "./GameCardStackStyle";

import GameOverview from "./gameEnd/GameOverview";
import {ClueInput} from "./clueSelection/ClueInput";
import {CluesContainer} from "./wordGuessing/CluesContainer";
import {GuessInput} from "./wordGuessing/GuessInput";

import {Spinner} from "../../views/design/Spinner";
import Red from "../../views/design/font-families/Red";
import Orange from "../../views/design/font-families/Orange";
import Yellow from "../../views/design/font-families/Yellow";
import {TurnEndScreen} from "./turnEnd/TurnEndScreen";
import {PleaseWait} from "./message/PleaseWait";
import {SelectNumberContainer} from "./wordSelection/SelectNumberContainer";
import {MysteryWordContainer} from "./shared/MysteryWordContainer";
import {AcceptRejectButtons} from "./wordSelection/AcceptRejectButtons";


// The game component responsible for the conditional rendering.
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            users: [],
            clues: null,
            loaded: false,
            gameModel: null,
            guessCorrect: null,
            activeUser: null
        };
        this.handleClue = this.handleClue.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
    }


    async handleGuess(guess) {
        let requestHeader = null;
        let response = null;

        const requestBody = JSON.stringify({
            guess: guess,
            wordIndex: localStorage.getItem("wordId")
        });

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.put(`/game/${localStorage.getItem('gameId')}/guess?${localStorage.getItem('wordId')}`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        } catch {
            console.log("Ooops 1");
            return;
        }
        if (response.data && response.data.guessCorrect) {

            this.setState({guessCorrect:response.data.guessCorrect})
            if (response.data.guessCorrect === "correct") {
                //todo guess is correct
            } else if (response.data.guessCorrect === "wrong") {
                //todo guess is wrong

            } else {
                // todo guess is skipped
            }
            this.changeGameStatus("TURN_ENDS");
        }

    }


    async handleClue(clue) {
        let requestHeader = null;
        let response = null;
        const requestBody = JSON.stringify({
            clue: clue
        });
        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.put(`/game/${localStorage.getItem('gameId')}/clue`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        } catch {
            console.log("Ooops 1");
            return;
        }

        this.setState(prevState => {
            let clues = Object.assign({}, prevState.clues);  // creating copy of state variable jasper
            clues.userId = this.state.currentUser.id;                     // update the name property, assign a new value
            clues.clue = clue;
            return {clues};                                 // return new object jasper object
        }, () => {
            console.log(this.state.clues);
            this.changeGameStatus("AWAITING_GUESS");
        });
        //todo change game status according to the gamegetinfo object.
    }


    changeGameStatus(status) {
        this.setState(prevState => {
            let gameModel = Object.assign({}, prevState.gameModel);  // creating copy of state variable jasper
            gameModel.gameStatus = status;                     // update the name property, assign a new value
            return {gameModel};                                 // return new object jasper object
        })
    }


    // TODO: Get gameId, userId (currently assumed it is in localStorage).
    async componentDidMount() {
        let requestHeader = null;
        let gameId = localStorage.getItem("gameId");
        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            const response = await api.get(`/game/${gameId}`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({gameModel: response.data, users: []});
            for (let i=0; i<response.data.playerIds.length; i++) {
                const userResponse = await api.get('/user/' + response.data.playerIds[i], {headers: {'X-Auth-Token': requestHeader}});
                //add a data field to user which shows if the user is the active player
                userResponse.data.isActivePlayer = userResponse.data.id == this.state.gameModel.activePlayer;
                if (userResponse.data.id == localStorage.getItem('userId')) {
                    this.setState({currentUser: userResponse.data});
                }
                if (userResponse.data.id == this.state.gameModel.activePlayer) {
                    this.setState({activeUser: userResponse.data});
                }
                this.state.users[i] = userResponse.data;
            }
            this.setState({loaded: 'loaded'});

        } catch (error) {
            alert(`Something went wrong while fetching the users: \n${handleError(error)}`);
        }
        this.changeGameStatus("AWAITING_GUESS");
    }


    isActivePlayer(playerId) {
        return playerId === this.state.gameModel.activePlayer;
    }


    render() {
        // delay until all the information is loaded
        if (this.state.loaded === null) {
            return <Spinner/>
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
                // TODO: Determine if active player has already selected number (currently assumes wordIndex != -1).
                if (this.state.gameModel.wordIndex === -1) {
                    changingElements = <SelectNumberContainer />;
                }
                else {
                    changingElements = <PleaseWait keyword={this.state.gameModel.wordIndex} />;
                }
            } else {
                // TODO: Determine if active player has already selected number (currently assumes wordIndex != -1).
                if (this.state.gameModel.wordIndex === -1) {
                    changingElements = <PleaseWait keyword={"Nothing yet"} />;
                }
                else {
                    changingElements = (
                        <React.Fragment>
                            <MysteryWordContainer mysteryWord={this.state.gameModel.words[this.state.gameModel.wordIndex]} />
                            <AcceptRejectButtons gameId={this.state.gameModel.gameId} wordIndex={this.state.gameModel.wordIndex}/>
                        </React.Fragment>
                    );
                }
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_CLUES") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <PleaseWait keyword="clues are"/>
            } else {
                changingElements =
                    <ClueInput handleClue={this.handleClue}></ClueInput>

            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_GUESS") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = (
                    <React.Fragment>
                        <CluesContainer style={{marginBottom: "5%"}}/>
                        <GuessInput handleGuess={this.handleGuess}/>
                    </React.Fragment>
                );
            } else {
                // display waiting message
                changingElements = <PleaseWait keyword="guess is"/>
            }
        }

        if (this.state.gameModel.gameStatus === "TURN_ENDS") {
            // display waiting message
            changingElements = <TurnEndScreen correct={this.state.guessCorrect} activeuser={this.state.activeUser}/>
        }

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
                    {(this.state.gameModel.gameStatus == "AWAITING_CLUES" && this.isActivePlayer(this.state.currentUser.id)) ||
                    (this.state.gameModel.gameStatus == "AWAITING_INDEX" && !this.isActivePlayer(this.state.currentUser.id)) ||
                    (this.state.gameModel.gameStatus == "AWAITING_GUESS" && !this.isActivePlayer(this.state.currentUser.id)) ||
                    (this.state.gameModel.gameStatus == "TURN_ENDS")
                        ?
                        <UserGameContainer>
                            {this.state.users.map((user) => {
                                return (<UserLayout user={user} key={user.id}/>);
                            })}
                        </UserGameContainer> :
                        (this.state.gameModel.gameStatus == "AWAITING_GUESS" && this.isActivePlayer(this.state.currentUser.id)) ? null :
                            <UserGameContainer style={{marginTop: "5%"}}>
                                <UserLayout user={this.state.currentUser} key={this.state.currentUser.id}/>;
                            </UserGameContainer>}
                    <ChangeElementContainer style={{flexDirection: 'column'}}> {changingElements}</ChangeElementContainer>
                </BaseContainerGame>
            </BaseContainerBody>
        );
    }
}


export default withRouter(Game);