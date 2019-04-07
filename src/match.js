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

  get asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson,
      players: this.players,
      winner: this.winner,
      current_move_from_id: this.currentMoveFromId,
      current_move_to_ids: this.currentMoveToIds,
      last_action: this.lastAction
    };
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

  // external actions

  touchSquare(squareId, playerNumber) { 
    let selectedSquare = this.gameState.selectedSquare;
    let touchedSquare = this.gameState.findSquareById(squareId);

    if (exists(this.winner)) {
      this._notify('Game is over.');
    } else if (!this.gameState.playersTurn(playerNumber)) {
      this._notify('It is not your turn.');
    } else {
      if (exists(selectedSquare)) {
        if (this.moveValid(this.currentMoveFromId, this.currentMoveToIds, touchedSquare.id)) {
          if (this.moveComplete(this.currentMoveFromId, this.currentMoveToIds, touchedSquare.id)) {
            let fromId = selectedSquare.id
            let toIds = this.currentMoveToIds.concat([touchedSquare.id])
            this.gameState.movePieces(fromId, toIds);
            this._clearMove();
            this.gameState.deselectSquares();
            this._addMoveToLastAction(fromId, toIds);
          } else {
            this.gameState.markSquare(touchedSquare.id);
            this._addToToCurrentMove(touchedSquare.id);
            this._notify('Piece can continue to jump.');
          }
        } else {
          this._clearMove();
          this.gameState.deselectSquares();
          this._notify('Move is not valid.');
        }
      } else {
        if (exists(touchedSquare.piece)) {
          if (touchedSquare.piece.playerNumber === playerNumber) {
            if (this.movePossible(touchedSquare.id)) {
              this.gameState.selectSquare(touchedSquare.id);
              this._addFromToCurrentMove(touchedSquare.id);
            } else {
              this._clearMove();
              this._notify('That piece cannot move.');
            }
          } else {
            this._clearMove();
            this._notify('That piece is not yours.');
          }
        } else {
          this._clearMove();
          this._notify('That square is empty.');
        }
      }
    }
  }

  // private setters

  _addFromToCurrentMove(squareId) {
    this.currentMoveFromId = squareId;
  }

  _addToToCurrentMove(squareId) {
    this.currentMoveToIds.push(squareId);
  }

  _clearMove() {
    this.currentMoveFromId = null;
    this.currentMoveToIds = [];
  }

  _notify(message) {
    this.lastAction = { kind: 'notification', data: { message: message }};
  }

  _addMoveToLastAction(fromId, toIds) {
    this.lastAction = { kind: 'move', data: { fromId: fromId, toIds: toIds }};
  }
}

export default Match;
