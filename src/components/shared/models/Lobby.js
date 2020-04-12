class Lobby {
    constructor(data = {}) {
        this.id = null;
        this.name = null;
        this.hostPlayerId = null;
        this.playerIds = null;
        this.gameId = null;
        Object.assign(this, data);
    }
}