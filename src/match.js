import exists from './exists';
import GameState from './game_state';
import Move from './move';

class Match {
  constructor(args) {
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players;
    this.winner = args.winner;
    this.currentMoveFromId = exists(args.current_move_from_id) ? args.current_move_from_id : null;
    this.currentMoveToIds = exists(args.current_move_to_ids) ? args.current_move_to_ids : [];
    this.lastAction = exists(args.last_action) ? args.last_action : null;
    this.notification = exists(args.notification) ? args.notification: this._defaultMessage;
  }

  get asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson,
      players: this.players,
      winner: this.winner,
      current_move_from_id: this.currentMoveFromId,
      current_move_to_ids: this.currentMoveToIds,
      last_action: this.lastAction,
      notification: this.notification
    };
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
        let move = new Move({
          fromId: this.currentMoveFromId,
          toIds: this.currentMoveToIds,
          proposedToId: touchedSquare.id,
          gameState: this.gameState 
        });

        if (move.valid) {
          if (move.complete) {
            let fromId = selectedSquare.id;
            let toIds = this.currentMoveToIds.concat([touchedSquare.id]);
            this.gameState.movePieces(fromId, toIds);
            this._clearMove();
            this.gameState.deselectSquares();
            this.gameState.passTurn();
            this.gameState.unmarkSquares();
            this._addMoveToLastAction(fromId, toIds);
            this._notify(this._defaultMessage);
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
        let move = new Move({
          fromId: touchedSquare.id,
          gameState: this.gameState 
        });

        if (exists(touchedSquare.piece)) {
          if (touchedSquare.piece.playerNumber === playerNumber) {
            if (move.possible) {
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

  // private getters
  get _turnMessage() {
    let currentPlayerIndex = this.gameState.currentPlayerNumber - 1;
    let currentPlayerName = this.players[currentPlayerIndex].name;
    return `${currentPlayerName} to move`;
  }

  get _winnerMessage() { 
    let winnerIndex = this.winner - 1;
    let winnerName = this.players[winnerIndex].name;
    return `${winnerName} wins`;
  }

  get _defaultMessage() { 
    if (exists(this.winner)) {
      return this._winnerMessage;
    } else {
      return this._turnMessage;
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
    this.notification = message;
  }

  _addMoveToLastAction(fromId, toIds) {
    this.lastAction = { kind: 'move', data: { fromId: fromId, toIds: toIds }};
  }
}

export default Match;
