import exists from '../src/exists'
import Match from '../src/match'
import GameState from '../src/game_state'
import SquareSet from '../src/square_set'
import Square from '../src/square'

const fixtureDefinitions = {
  square: {
    klass: Square,
    args: {
      id: 1,
      x: 1,
      y: 0,
      piece: {
        player_number: 1
      }
    }
  },
  match: {
    klass: Match,
    args: { 
      id: 1,
      game_state: { 
        current_player_number: 1,
        squares: [
          { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
          { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
          { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
          { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},

          { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
          { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
          { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
          { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},

          { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
          { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
          { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
          { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false }},

          { id: 13, x: 0, y: 3, piece: null },
          { id: 14, x: 2, y: 3, piece: null },
          { id: 15, x: 4, y: 3, piece: null },
          { id: 16, x: 6, y: 3, piece: null },

          { id: 17, x: 1, y: 4, piece: null },
          { id: 18, x: 3, y: 4, piece: null },
          { id: 19, x: 5, y: 4, piece: null },
          { id: 20, x: 7, y: 4, piece: null },

          { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
          { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
          { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
          { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},

          { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
          { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
          { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
          { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},

          { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
          { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
          { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
          { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
        ]
      },
      players: [
        { number: 1, name: 'aaa' },
        { number: 2, name: 'bbb' }
      ],
      winner: null
    } 
  },
  selectedSquareMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move_from_id: 12,
      game_state: { 
        current_player_number: 1,
        squares: [
          { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
          { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
          { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
          { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},

          { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
          { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
          { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
          { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},

          { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
          { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
          { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
          { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false, selected: true }},

          { id: 13, x: 0, y: 3, piece: null },
          { id: 14, x: 2, y: 3, piece: null },
          { id: 15, x: 4, y: 3, piece: null },
          { id: 16, x: 6, y: 3, piece: null },

          { id: 17, x: 1, y: 4, piece: null },
          { id: 18, x: 3, y: 4, piece: null },
          { id: 19, x: 5, y: 4, piece: null },
          { id: 20, x: 7, y: 4, piece: null },

          { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
          { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
          { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
          { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},

          { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
          { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
          { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
          { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},

          { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
          { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
          { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
          { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
        ]
      },
      players: [
        { number: 1, name: 'aaa' },
        { number: 2, name: 'bbb' }
      ],
      winner: null
    }
  },
  doubleJumpMatch: {
    klass: Match,
    args: {
      id: 1,
      current_move_from_id: 1,
      game_state: { 
        current_player_number: 1,
        squares: [
          { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false, selected: true }},
          { id: 2, x: 3, y: 0, piece: null },
          { id: 3, x: 5, y: 0, piece: null },
          { id: 4, x: 7, y: 0, piece: null },

          { id: 5, x: 0, y: 1, piece: null },
          { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false } },
          { id: 7, x: 4, y: 1, piece: null },
          { id: 8, x: 6, y: 1, piece: null },

          { id: 9, x: 1, y: 2, piece: null },
          { id: 10, x: 3, y: 2, piece: null },
          { id: 11, x: 5, y: 2, piece: null },
          { id: 12, x: 7, y: 2, piece: null },

          { id: 13, x: 0, y: 3, piece: null },
          { id: 14, x: 2, y: 3, piece: null },
          { id: 15, x: 4, y: 3, piece: { id: 14, player_number: 2, king: false } },
          { id: 16, x: 6, y: 3, piece: null },

          { id: 17, x: 1, y: 4, piece: null },
          { id: 18, x: 3, y: 4, piece: null },
          { id: 19, x: 5, y: 4, piece: null },
          { id: 20, x: 7, y: 4, piece: null },

          { id: 21, x: 0, y: 5, piece: null },
          { id: 22, x: 2, y: 5, piece: null },
          { id: 23, x: 4, y: 5, piece: null },
          { id: 24, x: 6, y: 5, piece: null },

          { id: 25, x: 1, y: 6, piece: null },
          { id: 26, x: 3, y: 6, piece: null },
          { id: 27, x: 5, y: 6, piece: null },
          { id: 28, x: 7, y: 6, piece: null },

          { id: 29, x: 0, y: 7, piece: null },
          { id: 30, x: 2, y: 7, piece: null },
          { id: 31, x: 4, y: 7, piece: null },
          { id: 32, x: 6, y: 7, piece: null }
        ]
      },
      players: [
        { number: 1, name: 'aaa' },
        { number: 2, name: 'bbb' }
      ],
      winner: null
    }
  },
  gameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      squares: [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
        { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
        { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},

        { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
        { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
        { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},

        { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
        { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
        { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
        { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false }},

        { id: 13, x: 0, y: 3, piece: null },
        { id: 14, x: 2, y: 3, piece: null },
        { id: 15, x: 4, y: 3, piece: null },
        { id: 16, x: 6, y: 3, piece: null },

        { id: 17, x: 1, y: 4, piece: null },
        { id: 18, x: 3, y: 4, piece: null },
        { id: 19, x: 5, y: 4, piece: null },
        { id: 20, x: 7, y: 4, piece: null },

        { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
        { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
        { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
        { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},

        { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
        { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
        { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
        { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},

        { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
        { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
        { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
        { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
      ]
    } 
  },
  selectedSquareGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      squares: [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
        { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
        { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},

        { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
        { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
        { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},

        { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
        { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
        { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
        { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false, selected: true }},

        { id: 13, x: 0, y: 3, piece: null },
        { id: 14, x: 2, y: 3, piece: null },
        { id: 15, x: 4, y: 3, piece: null },
        { id: 16, x: 6, y: 3, piece: null },

        { id: 17, x: 1, y: 4, piece: null },
        { id: 18, x: 3, y: 4, piece: null },
        { id: 19, x: 5, y: 4, piece: null },
        { id: 20, x: 7, y: 4, piece: null },

        { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
        { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
        { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
        { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},

        { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
        { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
        { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
        { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},

        { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
        { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
        { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
        { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
      ]
    }
  },
  jumpGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      squares: [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 2, x: 3, y: 0, piece: null },
        { id: 3, x: 5, y: 0, piece: null },
        { id: 4, x: 7, y: 0, piece: null },

        { id: 5, x: 0, y: 1, piece: null },
        { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false } },
        { id: 7, x: 4, y: 1, piece: null },
        { id: 8, x: 6, y: 1, piece: null },

        { id: 9, x: 1, y: 2, piece: null },
        { id: 10, x: 3, y: 2, piece: null },
        { id: 11, x: 5, y: 2, piece: null },
        { id: 12, x: 7, y: 2, piece: null },

        { id: 13, x: 0, y: 3, piece: null },
        { id: 14, x: 2, y: 3, piece: null },
        { id: 15, x: 4, y: 3, piece: null },
        { id: 16, x: 6, y: 3, piece: null },

        { id: 17, x: 1, y: 4, piece: null },
        { id: 18, x: 3, y: 4, piece: null },
        { id: 19, x: 5, y: 4, piece: null },
        { id: 20, x: 7, y: 4, piece: null },

        { id: 21, x: 0, y: 5, piece: null },
        { id: 22, x: 2, y: 5, piece: null },
        { id: 23, x: 4, y: 5, piece: null },
        { id: 24, x: 6, y: 5, piece: null },

        { id: 25, x: 1, y: 6, piece: null },
        { id: 26, x: 3, y: 6, piece: null },
        { id: 27, x: 5, y: 6, piece: null },
        { id: 28, x: 7, y: 6, piece: null },

        { id: 29, x: 0, y: 7, piece: null },
        { id: 30, x: 2, y: 7, piece: null },
        { id: 31, x: 4, y: 7, piece: null },
        { id: 32, x: 6, y: 7, piece: null }
      ]
    }
  },
  doubleJumpGameState: {
    klass: GameState,
    args: {
      current_player_number: 1,
      squares: [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 2, x: 3, y: 0, piece: null },
        { id: 3, x: 5, y: 0, piece: null },
        { id: 4, x: 7, y: 0, piece: null },

        { id: 5, x: 0, y: 1, piece: null },
        { id: 6, x: 2, y: 1, piece: { id: 13, player_number: 2, king: false } },
        { id: 7, x: 4, y: 1, piece: null },
        { id: 8, x: 6, y: 1, piece: null },

        { id: 9, x: 1, y: 2, piece: null },
        { id: 10, x: 3, y: 2, piece: null },
        { id: 11, x: 5, y: 2, piece: null },
        { id: 12, x: 7, y: 2, piece: null},

        { id: 13, x: 0, y: 3, piece: null },
        { id: 14, x: 2, y: 3, piece: null },
        { id: 15, x: 4, y: 3, piece: { id: 14, player_number: 2, king: false } },
        { id: 16, x: 6, y: 3, piece: null },

        { id: 17, x: 1, y: 4, piece: null },
        { id: 18, x: 3, y: 4, piece: null },
        { id: 19, x: 5, y: 4, piece: null },
        { id: 20, x: 7, y: 4, piece: null },

        { id: 21, x: 0, y: 5, piece: null },
        { id: 22, x: 2, y: 5, piece: null },
        { id: 23, x: 4, y: 5, piece: null },
        { id: 24, x: 6, y: 5, piece: null },

        { id: 25, x: 1, y: 6, piece: null },
        { id: 26, x: 3, y: 6, piece: null },
        { id: 27, x: 5, y: 6, piece: null },
        { id: 28, x: 7, y: 6, piece: null },

        { id: 29, x: 0, y: 7, piece: null },
        { id: 30, x: 2, y: 7, piece: null },
        { id: 31, x: 4, y: 7, piece: null },
        { id: 32, x: 6, y: 7, piece: null }
      ]
    }
  },
  squareSet: {
    klass: SquareSet,
    args: { 
      squares: [
        { id: 1, x: 1, y: 0, piece: { id: 1, player_number: 1, king: false }},
        { id: 2, x: 3, y: 0, piece: { id: 2, player_number: 1, king: false }},
        { id: 3, x: 5, y: 0, piece: { id: 3, player_number: 1, king: false }},
        { id: 4, x: 7, y: 0, piece: { id: 4, player_number: 1, king: false }},

        { id: 5, x: 0, y: 1, piece: { id: 5, player_number: 1, king: false }},
        { id: 6, x: 2, y: 1, piece: { id: 6, player_number: 1, king: false }},
        { id: 7, x: 4, y: 1, piece: { id: 7, player_number: 1, king: false }},
        { id: 8, x: 6, y: 1, piece: { id: 8, player_number: 1, king: false }},

        { id: 9, x: 1, y: 2, piece: { id: 9, player_number: 1, king: false }},
        { id: 10, x: 3, y: 2, piece: { id: 10, player_number: 1, king: false }},
        { id: 11, x: 5, y: 2, piece: { id: 11, player_number: 1, king: false }},
        { id: 12, x: 7, y: 2, piece: { id: 12, player_number: 1, king: false }},

        { id: 13, x: 0, y: 3, piece: null },
        { id: 14, x: 2, y: 3, piece: null },
        { id: 15, x: 4, y: 3, piece: null },
        { id: 16, x: 6, y: 3, piece: null },

        { id: 17, x: 1, y: 4, piece: null },
        { id: 18, x: 3, y: 4, piece: null },
        { id: 19, x: 5, y: 4, piece: null },
        { id: 20, x: 7, y: 4, piece: null },

        { id: 21, x: 0, y: 5, piece: { id: 13, player_number: 2, king: false }},
        { id: 22, x: 2, y: 5, piece: { id: 14, player_number: 2, king: false }},
        { id: 23, x: 4, y: 5, piece: { id: 15, player_number: 2, king: false }},
        { id: 24, x: 6, y: 5, piece: { id: 16, player_number: 2, king: false }},

        { id: 25, x: 1, y: 6, piece: { id: 17, player_number: 2, king: false }},
        { id: 26, x: 3, y: 6, piece: { id: 18, player_number: 2, king: false }},
        { id: 27, x: 5, y: 6, piece: { id: 19, player_number: 2, king: false }},
        { id: 28, x: 7, y: 6, piece: { id: 20, player_number: 2, king: false }},

        { id: 29, x: 0, y: 7, piece: { id: 21, player_number: 2, king: false }},
        { id: 30, x: 2, y: 7, piece: { id: 22, player_number: 2, king: false }},
        { id: 31, x: 4, y: 7, piece: { id: 23, player_number: 2, king: false }},
        { id: 32, x: 6, y: 7, piece: { id: 24, player_number: 2, king: false }}
      ]
    }
  },
  mustJumpSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":null},

        {"x":1,"y":4,"piece":null},
        {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":null},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    }
  },
  noJumpSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

        {"x":1,"y":4,"piece":null},
        {"x":3,"y":4,"piece":null},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":7,"y":6,"piece":{"player_number":2,"direction":-1,"king":false}},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":{"player_number":2,"direction":-1,"king":false}}
      ]
    }
  },
  selectedMustJumpSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":null},

        {"x":1,"y":4,"piece":null},
        {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":null},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":null},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    }
  },
  selectedNoJumpSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

        {"x":1,"y":4,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":3,"y":4,"piece":null},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":null},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":null},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    }
  },
  possibleJumpsSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":null},

        {"x":1,"y":4,"piece":null},
        {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":null},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":null},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    } 
  },
  possibleMovesSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

        {"x":1,"y":4,"piece":null},
        {"x":3,"y":4,"piece":null},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":null},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":null},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    }
  },
  noPossibleMovesSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":6,"y":3,"piece":null},

        {"x":1,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":3,"y":4,"piece":{"player_number":1,"direction":1,"king":false}},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":null},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    }
  },
  noPossibleJumpsSquareSet: {
    klass: SquareSet,
    args: {
      "current_player_number":1,
      "squares": [
        {"x":1,"y":0,"piece":null},
        {"x":3,"y":0,"piece":null},
        {"x":5,"y":0,"piece":null},
        {"x":7,"y":0,"piece":null},

        {"x":0,"y":1,"piece":null},
        {"x":2,"y":1,"piece":null},
        {"x":4,"y":1,"piece":null},
        {"x":6,"y":1,"piece":null},

        {"x":1,"y":2,"piece":null},
        {"x":3,"y":2,"piece":null},
        {"x":5,"y":2,"piece":null},
        {"x":7,"y":2,"piece":null},

        {"x":0,"y":3,"piece":null},
        {"x":2,"y":3,"piece":null},
        {"x":4,"y":3,"piece":null},
        {"x":6,"y":3,"piece":{"player_number":1,"direction":1,"king":false}},

        {"x":1,"y":4,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":3,"y":4,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":5,"y":4,"piece":null},
        {"x":7,"y":4,"piece":null},

        {"x":0,"y":5,"piece":null},
        {"x":2,"y":5,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":4,"y":5,"piece":null},
        {"x":6,"y":5,"piece":null},

        {"x":1,"y":6,"piece":null},
        {"x":3,"y":6,"piece":null},
        {"x":5,"y":6,"piece":null},
        {"x":7,"y":6,"piece":{"player_number":2,"direction":-1,"king":false}},

        {"x":0,"y":7,"piece":null},
        {"x":2,"y":7,"piece":null},
        {"x":4,"y":7,"piece":null},
        {"x":6,"y":7,"piece":null}
      ]
    }
  },
  withSquareSquareSet: {
    klass: SquareSet,
    args: {
      "squares": [
        {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false}}
      ]
    }
  },
  withNoSquareSquareSet: {
    klass: SquareSet,
    args: {
      squares: []
    }
  },
  withSelectedSquareSet: {
    klass: SquareSet,
    args: {
      "squares": [
        {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false, "selected":true}}
      ]
    }
  },
  withoutSelectedSquareSet: {
    klass: SquareSet,
    args: {
      "squares": [
        {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false, "selected":false}}
      ]
    }
  },
  withNeighboursSquareSet: {
    klass: SquareSet,
    args: {
      "squares": [
        {"x":1,"y":1,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":2,"y":2,"piece":{"player_number":2,"direction":-1,"king":false}},
        {"x":3,"y":3,"piece":{"player_number":2,"direction":-1,"king":false}}
      ]
    }
  },
  withEmptySquareSquareSet: {
    klass: SquareSet,
    args: {
      "squares": [
        {"x":1,"y":1,"piece": null}
      ]
    }
  }
};

const deepMerge = function(aObject, bObject) {
  let cObject = {};

  let keys = [...new Set([...Object.keys(aObject), ...Object.keys(bObject)])];

  keys.forEach(function(k) {
    let aValue = aObject[k];
    let bValue = bObject[k];
    let cValue = undefined;

    if (exists(bValue)) {
      if (bValue.constructor === Object) {
        cValue = deepMerge(aValue, bValue); 
      } else { 
        cValue = bValue;
      }
    } else {
      cValue = aValue;
    }

    cObject[k] = cValue;
  });
  return cObject;
};

const fixtures = function(name, customArgs) {
  let definition = fixtureDefinitions[name];
  let args = {};
  if (exists(customArgs)) {
    args = deepMerge(definition.args, customArgs);
  } else {
    args = Object.assign({}, definition.args);
  }
  return new definition.klass(args);
};

export default fixtures

