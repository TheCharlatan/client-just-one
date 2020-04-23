class GameModel {
    constructor(data = {}) {
        this.id = null;
        this.playerIds = null; // list of players in the game
        this.round = null;
        this.gameStatus = null; // game status: AWAITING_INDEX, AWAITING_CLUES, AWAITING_GUESS, GAME_OVER, DISPLAY_RESULTS
        this.words = null; // list of words
        this.wordIndex = null;  // index of chosen word
        this.score = null;
        this.activePlayerId = null; // id of the active player
        this.clues = null;  // list of clues
        this.timestamp = null;
        this.activePlayer = null;
        this.wordsGuessedCorrect = null;
        this.wordsGuessedWrong = null;
        this.cardStackCount = null;
        this.cardGuessedCount = null;

        Object.assign(this, data);
    }
}
export default GameModel;
