class GameModel {
    constructor(data = {}) {
        this.id = null;
        this.playerIds = null; // list of players in the game
        this.round = null;
        this.gameStatus = null; // game status: AWAITING_INDEX, ACCEPT_REJECT, AWAITING_CLUES, AWAITING_GUESS, GAME_OVER
        this.cardStatus = null; // card status: AWAITING_INDEX, NO_VALID_CLUE_ENTERED, USER_REJECTED_WORD, AWAITING_CLUES, ALL_CLUES_RECEIVED
        this.words = null; // list of words
        this.wordIndex = null;  // index of chosen word
        this.score = null;
        this.activePlayerId = null;
        this.clues = null;  // list of clues
        this.timestamp = null;
        this.activePlayer = null; //id of the active player
        this.wordsGuessedCorrect = null;
        this.wordsGuessedWrong = null;
        this.cardStackCount = null;
        this.cardGuessedCount = null;
        this.cardStatus = null;
        this.countAccept = null;

        Object.assign(this, data);
    }
}
export default GameModel;
