window.Snake.Game = (function() {
  var makeBoard = function(height, width){
    var board = []
    
    _(height).times(function() {
      board.push([]);
    });
    
    _(board).each(function(row) {
      _(width).times(function(){
        row.push(null);
      });
    });
    return board;
  }
  
  var randomPosition = function(board){
    var row = _.random(board.length - 1);
    var col = _.random(board[0].length - 1);
    return { row: row, col: col };
  };
  
  function Game() {
    this.board = makeBoard(30, 30);
    this.snake = new Snake({row: 15, col: 15}, 10)
    this.apple = randomPosition(this.board);
  }
  
  Game.prototype.update = function() {
    var that = this;
    var eaten = (this.snake.body[0].row == this.apple.row &&
      this.snake.body[0].col == this.apple.col);
    
    if (eaten){
      this.apple = randomPosition(this.board);
    }
  
      
    this.snake.step(eaten);
    
  };
  
  Game.prototype.isOver = function() {
    return this.snake.hitSelf() || !this.snake.onBoard(this.board);
  }
  
  
  function Snake(headPosition, length) {
    this.body = [];
    this.direction = [-1,0];
    
    var that = this;
    _(length).times(function(n){
      var pos = {row: headPosition.row + n, col: headPosition.col};
      that.body.push(pos);
    });
  }
  
  Snake.prototype.step = function(grow){
    if(!grow){
      this.body.pop();
    }
    
    var oldHead = this.body[0]
    var newHead = {
      row: oldHead.row + this.direction[0],
      col: oldHead.col + this.direction[1]
    };
      
    this.body.unshift(newHead);
  };
  
  Snake.prototype.turn = function(dir) { 
    var newDir;
    switch(dir){
      case "up":
        newDir = [-1, 0];
        break;
      case "down":
        newDir = [1, 0];
        break;
      case "right":
        newDir = [0, 1];
        break;
      case "left":
        newDir = [0, -1];
        break
      default:
        console.log('doing it wrong.');
        break;
    }
    
    //can't go backwards
    if (newDir[0] != (this.direction[0] * -1) ||
        newDir[1] != (this.direction[1] * -1)) {
      this.direction = newDir;
    } else {
      console.log('no reversing');
    }
  };
  
  Snake.prototype.onBoard = function(board){
    var height = board.length; //outer array length == number of rows
    var width = board[0].length; // inner array length == number of cols
    
    var head = this.body[0];
    
    return (head.row >= 0 &&
            head.row < height &&
            head.col >= 0 &&
            head.col < width);
  };
  
  Snake.prototype.hitSelf = function(){
    var restOfBody = _(this.body).rest(1);
    var head = this.body[0];
    
    return _(restOfBody).some(function(cell) {
      return (cell.row == head.row && cell.col == head.col);
    });
  };
  
  return Game;
})();