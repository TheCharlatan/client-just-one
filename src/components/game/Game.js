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
            activeUser: null,
            frontendGameStatus: "SELECT_INDEX" // frontend status to allow more fine-grained control
            // TODO: Timer
        };
        this.handleClue = this.handleClue.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
    }


    // TODO: function to update data and set frontendGameStatus accordingly, set timer, etc.


    async handleGuess(guess) {
        let requestHeader = null;
        let response = null;

        const requestBody = JSON.stringify({
            guess: guess,
            wordIndex: this.gameModel.wordIndex
        });

        try {
            requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.put(`/game/${localStorage.getItem('gameId')}/guess`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        }
        catch {
            console.log(`An error occurred when submitting the guess: \n${handleError(error)}`);
            return;
        }

        if (response.data && response.data.guessCorrect) {
            this.setState({guessCorrect: response.data.guessCorrect})
            // TODO: Notify other players as well.
            this.setFrontendGameStatus("TURN_FINISHED");
        }
    }


    async handleClue(clue) {

        try {
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            let requestBody = JSON.stringify({ clue: clue });
            await api.put(`/game/${localStorage.getItem('gameId')}/clue`, requestBody, {headers: {'X-Auth-Token': requestHeader}});
        }
        catch {
            console.log(`An error occurred when submitting the clue: \n${handleError(error)}`);
            return;
        }

        this.setFrontendGameStatus("AWAITING_GUESS");
    }


    setFrontendGameStatus(status) {
        if (status in FrontendGameStates) {
            this.setState({
                frontendGameStatus: status
            });
        }
    }


    // TODO: Get gameId, userId (currently assumed it is in localStorage).
    async componentDidMount() {
        let response = null;
        let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');

        try {
            let gameId = localStorage.getItem("gameId");
            let requestHeader = 'X-Auth-Token ' + localStorage.getItem('token');
            response = await api.get(`/game/${gameId}`, {headers: {'X-Auth-Token': requestHeader}});
            this.setState({gameModel: response.data, users: []});
        }
        catch (error) {
            alert(`Something went wrong while fetching the game data: \n${handleError(error)}`);
            return;
        }

        try {
            for (let i=0; i<response.data.playerIds.length; i++) {
                const userResponse = await api.get('/user/' + response.data.playerIds[i], {headers: {'X-Auth-Token': requestHeader}});
                if (userResponse.data.id == localStorage.getItem('userId')) {
                    this.setState({currentUser: userResponse.data});
                }
                if (userResponse.data.id == this.state.gameModel.activePlayer) {
                    this.setState({activeUser: userResponse.data});
                }
                this.state.users[i] = userResponse.data;
            }
            this.setState({loaded: true});
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
            return <Spinner/>
        }

        // game has ended -> use separate screen
        if (this.state.gameModel.gameStatus === "GAME_OVER") {
            return <GameOverview gameModel={this.state.gameModel} users={this.state.users}/>;
        }

        // React component(s) that change depending on the game state.
        let changingElements = null;
        let userElements = null;

        // no index selected yet
        if (this.state.frontendGameStatus === "SELECT_INDEX") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <SelectNumberContainer gameId={this.state.gameModel.id} /> // active player can select number
            }
            else {
                changingElements = <PleaseWait keyword={"Nothing yet "} /> // non-active players have to wait
            }
        }

        // index selected, but not confirmed
        if (this.state.frontendGameStatus === "ACCEPT_REJECT_WORD") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <PleaseWait keyword={"Not all confirmations/rejections "} />
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

        if (this.state.gameModel.gameStatus === "AWAITING_CLUES") {
            if (this.isActivePlayer(this.state.currentUser.id)) {
                changingElements = <PleaseWait keyword="Clues are being "/>
            }
            else {
                changingElements = <ClueInput handleClue={this.handleClue} />
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
            }
            else {
                changingElements = <PleaseWait keyword="Guess is being "/>
            }
        }

        if (this.state.gameModel.gameStatus === "TURN_FINISHED") {
            changingElements = <TurnEndScreen correct={this.state.guessCorrect} activeUser={this.state.activeUser}/>
        }


        if ((this.state.gameModel.gameStatus == "AWAITING_CLUES" && this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.gameModel.gameStatus == "AWAITING_INDEX" && !this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.gameModel.gameStatus == "AWAITING_GUESS" && !this.isActivePlayer(this.state.currentUser.id)) ||
            (this.state.gameModel.gameStatus == "TURN_ENDS")) {
            userElements = (
                <UserGameContainer>
                    {this.state.users.map((user) => {
                        return (
                            <UserLayout
                                user={user}
                                key={user.id}
                                isActivePlayer={this.isActivePlayer(user.userId)}
                            />
                            );
                    })}
                </UserGameContainer>
            );
        }
        else if (!this.state.gameModel.gameStatus == "AWAITING_GUESS" || !this.isActivePlayer(this.state.currentUser.id)) {
            userElements = (
                <UserGameContainer style={{marginTop: "5%"}}>
                    <UserLayout
                        user={this.state.currentUser}
                        key={this.state.currentUser.id}
                        isActivePlayer={this.isActivePlayer(this.state.currentUser)}
                    />;
                </UserGameContainer>
            );
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