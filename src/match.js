import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import exists from './exists';
import GameState from './game_state';
import Move from './move';

class Match {
  constructor(args) {
    this.id = args.id;
    this.gameState = new GameState(args.game_state);
    this.players = buildPlayers(args.players);
    this.currentMoveFromId = exists(args.current_move_from_id) ? args.current_move_from_id : null;
    this.currentMoveToIds = exists(args.current_move_to_ids) ? args.current_move_to_ids : [];
    this.lastAction = buildLastAction(args.last_action);
    this.notification = buildNotification(this, args.notification);
  }

  get asJson() {
    let baseJson = asJson(this);
    let extraJson = {
      current_move_from_id: this.currentMoveFromId,
      current_move_to_ids: this.currentMoveToIds,
    };
    return Object.assign(baseJson, extraJson);
  }

  get winner() {
    return winner(this);
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
            this._notify(buildNotification(this));
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
