/**
 * User model
 */
class User {
  constructor(data = {}) {
    this.id = null;
    this.name = null;
    this.username = null;
    this.password = null;
    this.token = null;
    this.status = null;
    this.invitations = null;
    this.rank = null;
    this.score = null;
    this.gender = null;
    this.country = null;
    this.birthDay = null;
    this.creationDate = null;
    this.gameId = null;
    this.lobbyId = null;
    Object.assign(this, data);
  }
}
export default User;
