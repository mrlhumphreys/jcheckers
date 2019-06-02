import exists from './exists';
import GameState from './game_state';
import Move from './move';
import Player from './player';

class Match {
  constructor(args) {
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = args.players.map(function(p) { return new Player(p); });
    this.currentMoveFromId = exists(args.current_move_from_id) ? args.current_move_from_id : null;
    this.currentMoveToIds = exists(args.current_move_to_ids) ? args.current_move_to_ids : [];
    this.lastAction = exists(args.last_action) ? args.last_action : null;
    this.notification = exists(args.notification) ? args.notification : this._defaultMessage;
  }

  get asJson() {
    return {
      id: this.id,
      game_state: this.gameState.asJson,
      players: this.players.map(function(p) { return p.asJson(); }),
      current_move_from_id: this.currentMoveFromId,
      current_move_to_ids: this.currentMoveToIds,
      last_action: this.lastAction,
      notification: this.notification
    };
  }

  get winner() {
    let playerResigned = this.players.some(function(p) { return p.resigned; });
    if (playerResigned) {
      return this.players.filter(function(p) { return !p.resigned; })[0].playerNumber;
    } else {
      return this.gameState.winner;
    }
  }

  // external actions

  touchSquare(squareId, playerNumber) { 
    let selectedSquare = this.gameState.selectedSquare;
    let touchedSquare = this.gameState.findSquareById(squareId);

    this._clearLastAction();

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

  _findPlayerByNumber(playerNumber) {
    return this.players.filter((p) => { return p.playerNumber == playerNumber; })[0]; 
  }

  get _turnMessage() {
    let currentPlayer = this._findPlayerByNumber(this.gameState.currentPlayerNumber);
    return `${currentPlayer.name} to move`;
  }

  get _winnerMessage() { 
    let winningPlayer = this._findPlayerByNumber(this.winner);
    return `${winningPlayer.name} wins`;
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

  _clearLastAction() {
    this.lastAction = null;
  }

  _notify(message) {
    this.notification = message;
  }

  _addMoveToLastAction(fromId, toIds) {
    this.lastAction = { kind: 'move', data: { fromId: fromId, toIds: toIds }};
  }
}

export default Match;
