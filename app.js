window.Snake = {};

$(function () {
  var game = new Snake.Game();
  var container = $("<div id='container'></div>")
  
  _(game.board.length).times(function(n){
    var row = $("<div class='row row" + n + "'></div>");
    _(game.board[0].length).times(function(){
      row.append("<div></div>");
    });
    container.append(row);
  });
  
  $('body').append(container);
  
  var ui = new Snake.Ui(game);
  ui.start();
});