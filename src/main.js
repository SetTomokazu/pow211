var isPressing = false;
var key = null;
var canInput = true;
document.onkeydown = (event) => {
  //if (isPressing) return;
  if (event.which < 37 || 40 < event.which) return;
  if (canInput) {
    if (game.move(event.which)) {
      canInput = false;
      window.setTimeout(() => { canInput = true; }, 250);
    }
  }
};


var game = null;
(function () {
  game = new Game();
  game.start();
})();