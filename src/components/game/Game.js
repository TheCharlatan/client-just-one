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
} from "./shared/layouts/GameLayout"
import {GameInfo, GameInfoLabel, Info, InfoLabel} from "./shared/layouts/GameInfoStyle";
import UserLayout from "./shared/layouts/UserLayout";
import {CardStack, CardStackLabel, CardStackNumber} from "./shared/layouts/GameCardStackStyle";

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
import {FrontendGameStates} from "./shared/FrontendGameStates";
import {NonInterferingMessageBox} from "./message/NonInterferingMessageBox";
import {Timer} from "./shared/Timer";


// The game component responsible for the conditional rendering.
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            users: [],
            loaded: false,
            gameModel: null,
            guessCorrect: null, // gets set in GuessInput.handleGuess
            activeUser: null,
            frontendGameStatus: "SELECT_INDEX", // frontend status to allow more fine-grained control, uses ./shared/FrontendGameStates
            updateTimer: null, // Timer to periodically pull the newest game data and update the game state accordingly
            lastTurnEndScreenDate: null, // when the last TurnEndScreen was opened
        };
        this.messageBox = null; // In certain situations a message box is displayed for a few seconds for information purposes.
        this.updateGame = this.updateGame.bind(this);
    }


    // update the game state based on newest game data
    async updateGame() {
        this.messageBox = null;

        const prevState = JSON.parse(JSON.stringify(this.state)); // deep-copy previous state
        await this.updateGameData();

        // TODO: Player has left (new number of players is lower than in prevState.gameModel) -> reset state.

        // display the TurnEndScreen for at least 5s
        if (prevState.frontendGameStatus == "TURN_FINISHED" && Date.now() - this.state.lastTurnEndScreenDate <= 5000) {
            return;
        }

        if (this.state.gameModel.gameStatus === "AWAITING_INDEX") {
            this.setFrontendGameStatus("SELECT_INDEX");
            if (this.state.gameModel.cardStatus === "USER_REJECTED_WORD") {
                this.messageBox = <NonInterferingMessageBox id={'nonInterferingMessageBox'} message={"The word was rejected."} />; // Inform all players that the word was rejected.
            }
        }

        if (this.state.gameModel.gameStatus === "ACCEPT_REJECT") {
            if (this.state.gameModel.countAccept.includes(parseInt(localStorage.getItem('userId')))) {
                this.setFrontendGameStatus("THIS_USER_ACCEPTED_WORD");
            }else {
                this.setFrontendGameStatus("ACCEPT_REJECT_WORD");
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_CLUES") {
            this.setFrontendGameStatus("AWAITING_CLUES");
            if (prevState.gameModel.gameStatus === "ACCEPT_REJECT") {
                this.messageBox = <NonInterferingMessageBox id={'nonInterferingMessageBox'} message={"The word was accepted."} />; // Inform all players that the word was accepted.
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_GUESS") {
            this.setFrontendGameStatus("AWAITING_GUESS");
        }

        if ((prevState.gameModel.gameStatus === "AWAITING_GUESS" || prevState.gameModel.gameStatus === "AWAITING_GUESS") && this.state.gameModel.gameStatus === "AWAITING_INDEX") {
            this.setFrontendGameStatus("TURN_FINISHED");

            // TODO: Screen for no valid clues.
            if (this.state.gameModel.wordsGuessedCorrect > prevState.gameModel.wordsGuessedCorrect) {
                this.setState({ guessCorrect: 'correct' });
            }
            else if (this.state.gameModel.wordsGuessedWrong > prevState.gameModel.wordsGuessedWrong) {
                this.setState({ guessCorrect: 'wrong' });
            }
            else {
                this.setState({ guessCorrect: 'skipped' }); // TODO: Currently skipped is counted as wrong on server side (status from 66. commit).
            }

            this.setState({ lastTurnEndScreenDate: Date.now() });
        }

        if (this.state.gameModel.gameStatus === "GAME_OVER") {
            this.setFrontendGameStatus("GAME_OVER");
        }
    }


    setFrontendGameStatus(status) {
        if (status in FrontendGameStates) {
            this.setState({
                frontendGameStatus: status
            });
        }
    }


    async componentDidMount() {
        await this.updateGameData();
        this.setState({
            updateTimer: setInterval(() => this.updateGame(), 200)
        });
    }


    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }


    async updateGameData() {
        const prevState = JSON.parse(JSON.stringify(this.state)); // deep-copy previous state

        let response = null;
        let responseTimestamp = null;
        let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');

        try {
            let gameId = localStorage.getItem("gameId");
            response = await api.get(`/game/${gameId}`, {headers: {'X-Auth-Token': requestHeader}});
            responseTimestamp = response.data.timestamp; // save timestamp before (incorrect) automatic conversion
            this.setState({gameModel: response.data});
        }
        catch (error) {
            alert(`Something went wrong while fetching the game data: \n${handleError(error)}`);
            return;
        }
        
        console.log("Automatically parsed timestamp: " + this.state.gameModel.timestamp);
        console.log("Raw data timestamp: " + responseTimestamp);
        
        if (this.state.gameModel.timestamp !== null) {
            let timestamp = new Date();
            let [hours, minutes, seconds] = responseTimestamp.split(":");
            timestamp.setHours(hours);
            timestamp.setMinutes(minutes);
            timestamp.setSeconds(seconds);
            let gameModel = this.state.gameModel;
            gameModel.timestamp = timestamp;
            this.setState( {
                gameModel: gameModel
            });
        }

        // reduce requests by only updating when new round/player has left
        if (prevState.gameModel !== null && this.state.gameModel.round == prevState.gameModel.round && this.state.gameModel.playerIds.length == prevState.gameModel.playerIds.length) {
            this.setState({loaded: true});
            return;
        }

        try {
            let users = new Array();
            for (let i=0; i<response.data.playerIds.length; i++) {

                let userResponse = await api.get('/user/' + response.data.playerIds[i], {headers: {'X-Auth-Token': requestHeader}});
                if (userResponse.data.id == localStorage.getItem('userId')) {
                    this.setState({currentUser: userResponse.data});
                }
                if (userResponse.data.id == this.state.gameModel.activePlayer) {
                    this.setState({activeUser: userResponse.data});
                }

                users.push(userResponse.data);
            }

            this.setState({loaded: true, users: users});
        }

        catch (error) {
            alert(`Something went wrong while fetching the user data: \n${handleError(error)}`);
        }
    }


    isActivePlayer(playerId) {
        return playerId === this.state.gameModel.activePlayer;
    }


    render() {

        // delay until all the information is loaded
        if (!this.state.loaded) {
            return <Spinner />
        }

        // game has ended -> use separate screen
        if (this.state.gameModel.gameStatus === "GAME_OVER") {
            return <GameOverview
                gameModel={this.state.gameModel}
                users={this.state.users}
            />;
        }

        // React component(s) that change depending on the game state.
        let timer = null;
        let userElements = null;
        let changingElements = null;

        // no index selected yet
        if (this.state.gameModel.gameStatus === "AWAITING_INDEX") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <SelectNumberContainer gameId={this.state.gameModel.id} /> // active player can select number
            }
            else {
                changingElements = <PleaseWait keyword={"Nothing yet "} /> // non-active players have to wait
            }
        }

        // index selected, but not confirmed by all
        if (this.state.frontendGameStatus === "ACCEPT_REJECT_WORD") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <PleaseWait keyword={"Not all confirmations/rejections "} />
            }
            else {
                changingElements = (
                    <React.Fragment>
                        <MysteryWordContainer
                            mysteryWord={this.state.gameModel.words[this.state.gameModel.wordIndex]}
                        />
                        <AcceptRejectButtons
                            gameId={this.state.gameModel.gameId}
                            wordIndex={this.state.gameModel.wordIndex}
                        />
                    </React.Fragment>
                );
            }
        }

        // index selected and confirmed by current user
        if (this.state.frontendGameStatus === "THIS_USER_ACCEPTED_WORD") {
            changingElements = <PleaseWait keyword={"You already accepted, but not all others have the confirmation/rejection "} />
        }

        if (this.state.frontendGameStatus == "AWAITING_CLUES") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <PleaseWait keyword="Clues are being "/>
            }
            else {
                changingElements = (
                    <React.Fragment>
                        <ClueInput updateGame={this.updateGame} />
                        <MysteryWordContainer mysteryWord={this.state.gameModel.words[this.state.gameModel.wordIndex]} />
                    </React.Fragment>
                );
            }
            timer = <Timer startTime={this.state.gameModel.timestamp - Date.now() + 30000} key={"CluesTimer"}/>
        }

        if (this.state.frontendGameStatus == "AWAITING_GUESS") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = (
                    <React.Fragment>
                        <CluesContainer style={{marginBottom: "5%"}} />
                        <GuessInput updateGame={this.updateGame} gameModel={this.state.gameModel} />
                    </React.Fragment>
                );
            }
            else {
                changingElements = (
                    <React.Fragment>
                        <CluesContainer style={{marginBottom: "5%"}} />
                        <PleaseWait keyword="Guess is being "/>
                    </React.Fragment>
                );
            }
            timer = <Timer startTime={this.state.gameModel.timestamp - Date.now() + 30000} key={"GuessTimer"}/>
        }

        if (this.state.frontendGameStatus == "TURN_FINISHED") {
            changingElements = (
                <TurnEndScreen
                    correct={this.state.guessCorrect}
                    activeUser={this.state.activeUser}
                />
            );
        }

        // TODO: Sometimes overlapped by info messages -> fix formatting?
        if ((this.state.frontendGameStatus == "SELECT_INDEX" && !this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.frontendGameStatus == "ACCEPT_REJECT_WORD" && this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.gameModel.gameStatus == "AWAITING_CLUES" && this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.gameModel.gameStatus == "AWAITING_GUESS" && !this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.frontendGameStatus == "TURN_FINISHED")) {
            userElements = (
                <UserGameContainer>
                    {this.state.users.map((user) => {
                        return (
                            <UserLayout
                                user={user}
                                key={user.id}
                                isActivePlayer={this.isActivePlayer(user.id)}
                            />
                        );
                    })}
                </UserGameContainer>
            );
        }

        /*
        else {
            userElements = (
                <UserGameContainer style={{marginTop: "5%"}}>
                    <UserLayout
                        user={this.state.currentUser}
                        key={this.state.currentUser.id}
                        isActivePlayer={this.isActivePlayer(this.state.currentUser)}
                    />
                </UserGameContainer>
            );
        }
        */

        return (
            // Basic layout that is (nearly) the same in all game states.
            <BaseContainerBody>
                {this.messageBox}
                {timer}
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
                    {userElements}
                    <ChangeElementContainer style={{flexDirection: 'column'}}>
                        {changingElements}
                    </ChangeElementContainer>
                </BaseContainerGame>
            </BaseContainerBody>
        );
    }
}


export default withRouter(Game);
