var key = null;
var canInput = true;
const keys = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
document.onkeydown = (event) => {
  if (keys.findIndex(k => k == event.key) == -1) return;
  if (canInput) {
    if (game.move(event.key)) {
      canInput = false;
      window.setTimeout(() => { canInput = true; }, 150);
    }
  }
};


var game = null;
(function () {
  game = new Game();
  game.start();
})();