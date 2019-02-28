import exists from '../src/exists'
import Match from '../src/match'
import GameState from '../src/game_state'

const fixtureDefinitions = {
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
  game_state: {
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
