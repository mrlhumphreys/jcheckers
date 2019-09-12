# JCheckers

A checkers game state and validation library written in Javascript.

## Installation

Install via npm:

  $ npm install @mrlhumphreys/jcheckers

## Usage

ES5:

```javascript
  var Match = require('@mrlhumphreys/jcheckers').Match;
```

ES6:

```javascript
  import { Match } from '@mrlhumphreys/jcheckers'
```

Initialize a new match object:

```javascript 
  var match = new Match({
    id: 1,
    game_state: {
      current_player_number: 1,
      squares: [
        { 
          id: 1, 
          x: 1, 
          y: 0, 
          piece: {
            id: 1, 
            player_number: 1, 
            king: false
          }
        },
        ...
      ] 
    },
    players: [
      { player_number: 1, name: 'aaa' },
      { player_number: 2, name: 'bbb' }
    ],
    winner: null
  });
```

Serialize match object:

```javascript
  match.asJson;
```

Make a move

```javascript
  match.touchSquare(12, 1); // select square 12 for player 1 
  match.touchSquare(16, 1); // move to square 16 for player 1 
```

Get winner

```javascript
  match.winner;
```

## Development

After checkout out the repo, run `npm install` to install dependencies. Run `npm build` to transpile ES6 to ES5 into the lib directory. Run `npm test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mrlhumphreys/jcheckers. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The module is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
