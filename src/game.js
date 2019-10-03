class Game {
  constructor() {
    this.tiles = [];
    this.score = 0;
    this.gameover = false;
  }
  start() {
    this.gameover = false;
    this.score = 0;
    this.tiles.push(new Tile(2, new Vector2(1, 3)));
    document.getElementById("score").innerText = this.score;
  }
  move(key) {
    if (this.gameover) return;
    let isMoved = false;
    switch (key) {
      case 37: isMoved = this._moveLeft(); break;// left
      case 38: isMoved = this._moveUp(); break;// up
      case 39: isMoved = this._moveRight(); break;// right
      case 40: isMoved = this._moveDown(); break;// down
    }
    if (isMoved) this.spawn();
    this.gameover = this.isGameover();
    if (this.gameover) {
      console.log("Game Over");
    }
    document.getElementById("score").innerText = this.score;
  }
  _moveUp() {
    let isMoved = false;
    for (let x = 1; x <= 4; x++) {
      isMoved |= this._moveAtLiner(new Array(
        new Vector2(x, 1),
        new Vector2(x, 2),
        new Vector2(x, 3),
        new Vector2(x, 4),
      ));
    }
    return isMoved;
  }
  _moveDown() {
    let isMoved = false;
    for (let x = 1; x <= 4; x++) {
      isMoved |= this._moveAtLiner(new Array(
        new Vector2(x, 4),
        new Vector2(x, 3),
        new Vector2(x, 2),
        new Vector2(x, 1),
      ));
    }
    return isMoved;
  }
  _moveRight() {
    let isMoved = false;
    for (let y = 1; y <= 4; y++) {
      isMoved |= this._moveAtLiner(new Array(
        new Vector2(4, y),
        new Vector2(3, y),
        new Vector2(2, y),
        new Vector2(1, y),
      ));
    }
    return isMoved;
  }
  _moveLeft() {
    let isMoved = false;
    for (let y = 1; y <= 4; y++) {
      isMoved |= this._moveAtLiner(new Array(
        new Vector2(1, y),
        new Vector2(2, y),
        new Vector2(3, y),
        new Vector2(4, y),
      ));
    }
    return isMoved;
  }
  _moveAtLiner(ary) {
    let isMoved = false;
    let top = null;
    let count = 0;
    for (let p of ary) {
      let t = this.tiles.find(t => t.position.x == p.x && t.position.y == p.y);
      if (t) {
        if (top) {
          if (top.value == t.value) {
            t.setValue(t.value * 2);
            this.score += t.value;
            t.move(ary[count].x, ary[count].y);
            top.remove();
            this.tiles = this.tiles.filter(a => a != top);
            top = t;
            isMoved = true;
          } else {
            count++;
            top = t;
            if (!t.position.equals(ary[count])) isMoved = true;
            t.move(ary[count].x, ary[count].y);
          }
        } else {
          top = t;
          if (!t.position.equals(ary[count])) isMoved = true;
          t.move(ary[count].x, ary[count].y);
        }
      }
    }
    return isMoved;
  }
  spawn() {
    let rnd = Math.floor(Math.random() * (16 + 1)) + 1;
    let val = (Math.floor(Math.random() * (1 + 1)) + 1) * 2;
    while (rnd > 0) {
      for (let x = 1; x <= 4; x++) {
        for (let y = 1; y <= 4; y++) {
          let t = this.tiles.find(t => t.position.x == x && t.position.y == y);
          if (!t) {
            rnd--;
            if (rnd == 0) {
              this.tiles.push(new Tile(val, new Vector2(x, y)));
              return;
            }
          }
        }
      }
    }
  }
  isGameover() {
    // まだ空きがある場合OK
    if (this.tiles.length < 16)
      return false;
    for (let x = 1; x <= 4; x++) {
      for (let y = 1; y <= 4; y++) {
        let t = this.tiles.find(t => t.position.x == x && t.position.y == y);
        let n = this.tiles.find(t => t.position.x == x + 1 && t.position.y == y);
        if (n) {
          if (n.value == t.value) return false;
        }
        n = this.tiles.find(t => t.position.x == x && t.position.y == y + 1);
        if (n) {
          if (n.value == t.value) return false;
        }
      }
    }
    return true;
  }
}
