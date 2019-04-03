import exists from './exists';
import GameState from './game_state';

class Match {
  constructor(args) {
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.currentMoveFromId = exists(args.current_move_from_id) ? args.current_move_from_id : null;
    this.currentMoveToIds = exists(args.current_move_to_ids) ? args.current_move_to_ids : [];
    this.lastAction = exists(args.last_action) ? args.last_action : null;
  }

  asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson(),
      players: this.players,
      winner: this.winner,
      current_move_from_id: this.currentMoveFromId,
      current_move_to_ids: this.currentMoveToIds,
      last_action: this.lastAction
    };
  }

  squares() {
    return this.gameState.squares;
  }

  selectedSquare() {
    return this.gameState.selectedSquare();
  }

  findSquareById(id) {
    return this.gameState.findSquareById(id);
  }

  playersTurn(playerNumber) {
    return this.gameState.playersTurn(playerNumber);
  }

  playersName(number) {
    let index = number - 1;
    return this.players[index].name;
  }

  currentPlayerName() {
    return this.playersName(this.gameState.currentPlayerNumber);
  }

  winnerName() {
    if (exists(this.winner)) {
      return this.playersName(this.winner);
    } else {
      return null;
    }
  }

  // move calculations

  movePossible(fromId) {
    return this.gameState.movePossible(fromId);
  }

  moveValid(fromId, toIds, proposedToId) {
    return this.gameState.moveValid(fromId, toIds, proposedToId);
  }

  moveComplete(fromId, toIds, proposedToId) {
    return this.gameState.moveComplete(fromId, toIds, proposedToId);
  }

  // actions

  selectSquare(squareId) {
    this.gameState.selectSquare(squareId); 
  }

  deselectSquares() {
    this.gameState.deselectSquares();
  }

  markSquare(squareId) {
    this.gameState.markSquare(squareId);
  } 

  addFromToCurrentMove(squareId) {
    this.currentMoveFromId = squareId;
  }

  addToToCurrentMove(squareId) {
    this.currentMoveToIds.push(squareId);
  }

  clearMove() {
    this.currentMoveFromId = null;
    this.currentMoveToIds = [];
  }

  notify(message) {
    this.lastAction = { kind: 'notification', data: { message: message }};
  }

  movePieces(fromId, toIds) {
    this.gameState.movePieces(fromId, toIds);
  }

  addMoveToLastAction(fromId, toIds) {
    this.lastAction = { kind: 'move', data: { fromId: fromId, toIds: toIds }};
  }

  // external actions

  touchSquare(squareId, playerNumber) { 
    let selectedSquare = this.selectedSquare();
    let touchedSquare = this.findSquareById(squareId);

    if (exists(this.winner)) {
      this.notify('Game is over.');
    } else if (!this.playersTurn(playerNumber)) {
      this.notify('It is not your turn.');
    } else {
      if (exists(selectedSquare)) {
        if (this.moveValid(this.currentMoveFromId, this.currentMoveToIds, touchedSquare.id)) {
          if (this.moveComplete(this.currentMoveFromId, this.currentMoveToIds, touchedSquare.id)) {
            let fromId = selectedSquare.id
            let toIds = this.currentMoveToIds.concat([touchedSquare.id])
            this.movePieces(fromId, toIds);
            this.clearMove();
            this.deselectSquares();
            this.addMoveToLastAction(fromId, toIds);
          } else {
            this.markSquare(touchedSquare.id);
            this.addToToCurrentMove(touchedSquare.id);
            this.notify('Piece can continue to jump.');
          }
        } else {
          this.clearMove();
          this.deselectSquares();
          this.notify('Move is not valid.');
        }
      } else {
        if (exists(touchedSquare.piece)) {
          if (touchedSquare.piece.playerNumber === playerNumber) {
            if (this.movePossible(touchedSquare.id)) {
              this.selectSquare(touchedSquare.id);
              this.addFromToCurrentMove(touchedSquare.id);
            } else {
              this.clearMove();
              this.notify('That piece cannot move.');
            }
          } else {
            this.clearMove();
            this.notify('That piece is not yours.');
          }
        } else {
          this.clearMove();
          this.notify('That square is empty.');
        }
      }
    }
  }
}

export default Match;
