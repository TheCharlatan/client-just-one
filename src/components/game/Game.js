import React from 'react';
import {api, handleError} from '../../helpers/api';
import {withRouter} from 'react-router-dom';
import {
    BaseContainerGame,
    CardGuessedContainer,
    CardStacksContainer,
    ChangeElementContainer,
    GameInfoContainer,
    GameUserLeftContainer,
    GameUserRightContainer, TopCenterContainer
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
import AlertModal from "./shared/AlertModal";
import LeaveButton from "./leaveGame/LeaveBtn";
import {Background, TopLeftContainer, TopRightContainer} from "../../helpers/layout";


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
            show: false, // modal window for alert when player closes the browser unexpectedly.
            messageBox: null, // In certain situations a message box is displayed for a few seconds for information purposes.
            previousState: null
        };
        this.updateGame = this.updateGame.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
        this.alert = null;
    }

    //show the alert window
    showModal() {
        this.setState({
            show: true,
        });
    }

    hideModal() {
        this.setState({
            show: false,
        });
    }

    // update the game state based on newest game data
    async updateGame() {

        let prevState = JSON.parse(JSON.stringify(this.state)); // deep-copy previous state
        await this.updateGameData();

        this.setState({messageBox: null});

        if (prevState.gameModel.playerIds.length !== this.state.gameModel.playerIds.length)
        {
            clearInterval(this.updateTimer);
            this.showModal();
            
            let leftPlayerUserNames = new Array();

            prevState.users.forEach((user) => {
                if (!this.state.gameModel.playerIds.includes(user.id)) {
                    leftPlayerUserNames.push(user.username);
                }
            });

            if (this.state.gameModel.playerIds.length >=  3)
            {
                this.alert = (
                    <AlertModal
                        show={this.state.show}
                        message_1={`${leftPlayerUserNames.join(', ')} left unexpectedly. `}
                        error = "false"
                        message_2={`The game will continue in a few seconds.`}
                    />
                );
            }
            else {
                this.alert=(
                    <AlertModal
                        show={this.state.show}
                        message_1={`${leftPlayerUserNames.join(', ')} left unexpectedly. `}
                        message_2={`Unfortunately the game cannot be continued only with 2 players. You will be redirected to the game overview soon.`}
                    />
                );
            }

            setTimeout(() => {
                this.hideModal();
                this.alert = null;
                this.setState({
                    updateTimer: setInterval(() => this.updateGame(), 200)
                });
            }, 10000);
        }

        // display the TurnEndScreen for at least 5s
        if (prevState.frontendGameStatus == "TURN_FINISHED" && Date.now() - this.state.lastTurnEndScreenDate <= 5000) {
            return;
        }

        if (this.state.gameModel.gameStatus === "AWAITING_INDEX") {
            this.setFrontendGameStatus("SELECT_INDEX");
            if (this.state.gameModel.cardStatus === "USER_REJECTED_WORD") {
                this.setState({messageBox: <NonInterferingMessageBox id={'nonInterferingMessageBox'} message={"The word was rejected."} />}); // Inform all players that the word was rejected.
            }
        }

        if (this.state.gameModel.gameStatus === "ACCEPT_REJECT") {
            if (this.state.gameModel.countAccept.includes(parseInt(sessionStorage.getItem('userId')))) {
                this.setFrontendGameStatus("THIS_USER_ACCEPTED_WORD");
            } else {
                this.setFrontendGameStatus("ACCEPT_REJECT_WORD");
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_CLUES") {
            this.setFrontendGameStatus("AWAITING_CLUES");
            if (prevState.gameModel.gameStatus === "ACCEPT_REJECT") {
                this.setState({messageBox: <NonInterferingMessageBox id={'nonInterferingMessageBox'} message={"The word was accepted."} />}); // Inform all players that the word was accepted.
            }
        }

        if (this.state.gameModel.gameStatus === "AWAITING_GUESS") {
            this.setFrontendGameStatus("AWAITING_GUESS");
        }

        if ((prevState.gameModel.gameStatus === "AWAITING_CLUES" || prevState.gameModel.gameStatus === "AWAITING_GUESS") && (this.state.gameModel.gameStatus === "AWAITING_INDEX" || this.state.gameModel.gameStatus === "GAME_OVER")) {
            this.setFrontendGameStatus("TURN_FINISHED");
            this.setState({previousState: prevState});

            // TODO: Screen for no valid clues.

            if (this.state.gameModel.wordsGuessedCorrect > prevState.gameModel.wordsGuessedCorrect) {
                this.setState({ guessCorrect: 'correct' });
            }
            else if (this.state.gameModel.wordsGuessedWrong > prevState.gameModel.wordsGuessedWrong) {
                this.setState({ guessCorrect: 'wrong' });
            }
            else {
                this.setState({ guessCorrect: 'skipped' });
            }
            
            this.setState({ lastTurnEndScreenDate: Date.now() });
            return;
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
            updateTimer: setInterval(() => this.updateGame(), 200),
            previousState: JSON.parse(JSON.stringify(this.state))
        });
    }


    componentWillUnmount() {
        clearInterval(this.state.updateTimer);
    }


    async updateGameData() {
        if(!sessionStorage.getItem("gameId"))
        {
            return;
        }
        const prevState = JSON.parse(JSON.stringify(this.state)); // deep-copy previous state

        let response = null;
        let responseTimestamp = null;
        let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');

        try {
            let gameId = sessionStorage.getItem("gameId");
            response = await api.get(`/game/${gameId}`, {headers: {'X-Auth-Token': requestHeader}});
            responseTimestamp = response.data.timestamp; // save timestamp before (incorrect) automatic conversion
            this.setState({gameModel: response.data});
        }
        catch (error) {
            alert(`Something went wrong while fetching the game data: \n${handleError(error)}`);
            return;
        }

        if (this.state.gameModel.timestamp !== null) {
            let timestamp = new Date();
            let [hours, minutes, seconds] = responseTimestamp.split(":");
            timestamp.setHours(hours);
            timestamp.setMinutes(parseInt(minutes) + (new Date().getTimezoneOffset())); // assumes the responseTimestamp is in UTC
            timestamp.setSeconds(seconds);
            let gameModel = this.state.gameModel;
            gameModel.timestamp = timestamp;
            this.setState({
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
                if (userResponse.data.id == sessionStorage.getItem('userId')) {
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

    clearTimer()
    {
        clearInterval(this.state.updateTimer);
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
                roundsPlayed={this.state.gameModel.round - 1}
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
                        <ClueInput updateGame={this.updateGame} twoCluesInput={this.state.users.length == 3} />
                        <MysteryWordContainer mysteryWord={this.state.gameModel.words[this.state.gameModel.wordIndex]} />
                    </React.Fragment>
                );
            }
            timer = <Timer
                startTime={this.state.gameModel.timestamp - Date.now() + 30000}
                onTimerFinished={async () => {
                    let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
                    let requestBody = JSON.stringify({ clue: '' });
                    try {
                        await api.put(`/game/${sessionStorage.getItem('gameId')}/clue`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
                        if (this.state.gameModel.playerIds.length == 3) {
                            await api.put(`/game/${sessionStorage.getItem('gameId')}/clue`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
                        }
                    }
                    catch (error) {
                        console.log(`An error occurred when submitting the guess: \n${handleError(error)}`);
                    }
                }}
                key={"CluesTimer"}
            />
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
            timer = <Timer
                startTime={this.state.gameModel.timestamp - Date.now() + 30000}
                onTimerFinished={async () => {
                    let requestHeader = 'X-Auth-Token ' + sessionStorage.getItem('token');
                    let requestBody = JSON.stringify({ guess: '', wordIndex: this.props.gameModel.wordIndex});
                    try {
                        await api.put(`/game/${sessionStorage.getItem('gameId')}/guess`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
                    }
                    catch (error) {
                        console.log(`An error occurred when submitting the guess: \n${handleError(error)}`);
                    }
                }}
                key={"GuessTimer"}
            />
        }

        if (this.state.frontendGameStatus == "TURN_FINISHED") {
            changingElements = (
                <TurnEndScreen
                    correct={this.state.guessCorrect}
                    activeUser={this.state.previousState.activeUser}
                    mysteryWord={this.state.previousState.gameModel.words[this.state.previousState.gameModel.wordIndex]}
                />
            );
        }


        // Code to display the users on left and right part of the game.
        let usersOnLeft = [];
        let usersOnRight = [];

        for (let counter = 0; counter < this.state.users.length; ++counter) {
            if (counter == 1 || counter == 3) { // less space on right -> display less users there
                usersOnRight.push(this.state.users[counter]);
            }
            else {
                usersOnLeft.push(this.state.users[counter])
            }
        }

        userElements = (
            <React.Fragment>
                <GameUserLeftContainer>
                    {usersOnLeft.map((user) => {
                        return (
                            <UserLayout
                                user={user}
                                key={user.id}
                                isActivePlayer={this.isActivePlayer(user.id)}
                            />
                        );
                    })}
                </GameUserLeftContainer>
                <GameUserRightContainer>
                    {usersOnRight.map((user) => {
                        return (
                            <UserLayout
                                user={user}
                                key={user.id}
                                isActivePlayer={this.isActivePlayer(user.id)}
                            />
                        );
                    })}
                </GameUserRightContainer>
            </React.Fragment>
        );


        return (
            // Basic layout that is (nearly) the same in all game states.
            <BaseContainerGame>
                <Background/>
                <TopLeftContainer>
                    <LeaveButton clearTimer={this.clearTimer}/>
                </TopLeftContainer>

                <TopCenterContainer>
                {timer}
                </TopCenterContainer>
                {this.alert}

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
                        <InfoLabel>
                            <Orange>Skipped</Orange>
                        </InfoLabel>
                        <Info>
                            <Orange>
                                {(13 - this.state.gameModel.cardStackCount) - this.state.gameModel.wordsGuessedCorrect - 2*this.state.gameModel.wordsGuessedWrong}
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
                    {this.state.messageBox}
                </ChangeElementContainer>
            </BaseContainerGame>

        );
    }
}


export default withRouter(Game);
