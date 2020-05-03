export const FrontendGameStates = Object.freeze({
    // AWAITING_INDEX
    SELECT_INDEX: 'SELECT_INDEX', // active player has not yet selected a word
    // ACCEPT_REJECT
    ACCEPT_REJECT_WORD: 'ACCEPT_REJECT_WORD', // an index has been selected but not accepted/rejected by the current user
    THIS_USER_ACCEPTED_WORD: 'AWAITING_ACCEPT_REJECT', // an index has been selected and was accepted by the current user
    // AWAITING_CLUES
    AWAITING_CLUES: 'AWAITING_CLUES', // clue entering phase
    // AWAITING_GUESS
    AWAITING_GUESS: 'AWAITING_GUESS', // guess entering phase
    // only frontend: after AWAITING_GUESS, while AWAITING_INDEX
    TURN_FINISHED: 'TURN_FINISHED', // display the outcome of the round
    // GAME_OVER
    GAME_OVER: 'GAME_OVER' // game finished
});