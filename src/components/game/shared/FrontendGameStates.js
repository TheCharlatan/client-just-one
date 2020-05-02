export const FrontendGameStates = Object.freeze({
    // AWAITING_INDEX
    SELECT_INDEX: 'select_index', // active player has not yet selected a word
    ACCEPT_REJECT_WORD: 'accept_reject_word', // an index has been selected but not accepted/rejected

    AWAITING_ACCEPT_REJECT: 'awaiting_accept_reject',
    // AWAITING_CLUES
    AWAITING_CLUES: 'awaiting_clues', // clue entering phase
    // AWAITING_GUESS
    AWAITING_GUESS: 'awaiting_guess', // guess entering phase
    // special: after AWAITING_GUESS, while AWAITING_INDEX
    TURN_FINISHED: 'turn_finished', // display the outcome of the round
    // GAME_OVER
    GAME_OVER: 'game_over' // game finished
});