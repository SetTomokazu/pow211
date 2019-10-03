var isPressing = false;
var key = null;
document.onkeydown = (event) => {
  if (isPressing) return;
  if (event.which < 37 || 40 < event.which) return;
  let id = game.move(event.which);

};
document.onkeyup = (event) => {
  if (key < 37 || 40 < key) return;
};


var worker = null;
var game = null;
(function () {
  game = new Game();
  game.start();
})();