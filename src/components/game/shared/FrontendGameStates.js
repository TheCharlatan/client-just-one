export const FrontendGameStates = Object.freeze({
    // AWAITING_INDEX
    SELECT_INDEX: 'SELECT_INDEX', // active player has not yet selected a word
    ACCEPT_REJECT_WORD: 'ACCEPT_REJECT_WORD', // an index has been selected but not accepted/rejected
    // AWAITING_CLUES
    AWAITING_CLUES: 'AWAITING_CLUES', // clue entering phase
    // AWAITING_GUESS
    AWAITING_GUESS: 'AWAITING_GUESS', // guess entering phase
    // special: after AWAITING_GUESS, while AWAITING_INDEX
    TURN_FINISHED: 'TURN_FINISHED', // display the outcome of the round
    // GAME_OVER
    GAME_OVER: 'GAME_OVER' // game finished
});