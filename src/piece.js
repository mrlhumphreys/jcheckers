class Piece {
  constructor(args) {
    this.id = args.id;
    this.playerNumber = args.player_number;
    this.king = args.king ? args.king : false;
    this.selected = args.selected ? args.selected : false;
  }

  get asJson() {
    return {
      id: this.id,
      player_number: this.playerNumber,
      king: this.king,
      selected: this.selected
    };
  }

  get direction() {
    return (this.playerNumber === 1) ? 1 : -1;
  }

  // actions

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }

  promote() {
    this.king = true;
  }
}

export default Piece;
