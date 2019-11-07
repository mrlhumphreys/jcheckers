import { buildPlayers, buildLastAction, buildNotification, winner, asJson } from '@mrlhumphreys/jboardgame'
import { exists } from './utils';
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
    this._clearLastAction();

    let move = new Move({
      match: this,
      touchedSquareId: squareId,
      playerNumber: playerNumber
    });

    let result = move.result;

    switch (result.name) {
      case 'MoveInvalid':
        this._clearMove();
        this.gameState.deselectSquares();
        this._notify(result.message);
        break;
      case 'MoveIncomplete':
        this.gameState.markSquare(squareId);
        this._addToToCurrentMove(squareId);
        this._notify(result.message);
        break;
      case 'MoveComplete':
        let fromId = this.currentMoveFromId;
        let toIds = this.currentMoveToIds.concat([squareId]);
        this.gameState.move(fromId, toIds);
        this._addMoveToLastAction(fromId, toIds);
        this._clearMove();
        this._notify(buildNotification(this));
        break;
      case 'MovePossible':
        this.gameState.selectSquare(squareId);
        this._addFromToCurrentMove(squareId);
        break;
      default:
        this._clearMove();
        this._notify(result.message);
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
