window.Snake.Ui = (function(){
  function UserInterface(game){
    this.game = game;
    
    this.display();
    
    var that = this;
    $(document).keydown(function(event){
      var keyCode = parseInt(event.keyCode);
      
      switch(keyCode){
        case 37:
          that.game.snake.turn('left');
          break;
        case 38:
          that.game.snake.turn('up');
          break;
        case 39:
          that.game.snake.turn('right');
          break;
        case 40:
          that.game.snake.turn('down');
          break;
      }
    });
  }
  
  UserInterface.prototype.display = function(){
    $(".row div").removeClass();
    
    _(this.game.snake.body).each(function(pos){
      $($(".row" + pos.row + " div")[pos.col]).addClass('snake');
    });
    
    $($(".row" + this.game.apple.row + " div")[this.game.apple.col])
      .addClass('apple');
  };
  
  UserInterface.prototype.start = function(){
    var that = this;
    var interval = window.setInterval(function(){
      that.game.update();
      that.display();
      if (that.game.isOver()){
        window.clearInterval(interval);
        console.log('Game over');
      }
    }, 100)
  };
  
  return UserInterface;
})();