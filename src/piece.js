class Piece {
  constructor(args) {
    this.playerNumber = args.player_number;
    this.king = args.king ? args.king : false;
    this.selected = args.selected ? args.selected : false;
  }

  direction() {
    return (this.playerNumber == 1) ? 1 : -1;
  }
}

export default Piece;
