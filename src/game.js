class Game {
  constructor() {
    this.tiles = [];
    this.score = 0;
    this.gameover = false;
    this.xmax = 4;
    this.ymax = 4;
  }
  start() {
    this.gameover = false;
    this.score = 0;
    this.spawn();
    this.spawn();
    document.getElementById("score").innerText = this.score;
    document.getElementById("best_score").innerText = this.load();
  }
  move(key) {
    if (this.gameover) return;
    let isMoved = this[`_move${key}`]();
    if (isMoved) this.spawn();
    this.gameover = this.isGameover();
    if (this.gameover) {
      console.log("Game Over");
      this.save(this.score);
    }
    document.getElementById("score").innerText = this.score;

    return isMoved;
  }
  _moveArrowUp() {
    let isMoved = false;
    for (let x = 1; x <= this.xmax; x++) {
      let ary = [];
      for (let y = 1; y <= this.ymax; y++) {
        ary.push(new Vector2(x, y));
      }
      isMoved |= this._moveAtLiner(ary);
    }
    return isMoved;
  }
  _moveArrowDown() {
    let isMoved = false;
    for (let x = 1; x <= this.xmax; x++) {
      let ary = [];
      for (let y = this.ymax; y >= 1; y--) {
        ary.push(new Vector2(x, y));
      }
      isMoved |= this._moveAtLiner(ary);
    }
    return isMoved;
  }
  _moveArrowRight() {
    let isMoved = false;
    for (let y = 1; y <= this.ymax; y++) {
      let ary = [];
      for (let x = this.xmax; x >= 1; x--) {
        ary.push(new Vector2(x, y));
      }
      isMoved |= this._moveAtLiner(ary);
    }
    return isMoved;
  }
  _moveArrowLeft() {
    let isMoved = false;
    for (let y = 1; y <= this.ymax; y++) {
      let ary = [];
      for (let x = 1; x <= this.xmax; x++) {
        ary.push(new Vector2(x, y));
      }
      isMoved |= this._moveAtLiner(ary);
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
            top = null;
            count++;
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
    let rnd = Math.floor(Math.random() * (this.xmax * this.ymax - this.tiles.length)) + 1;
    let val = Math.sqrt(Math.pow(Math.random(), 2) + Math.pow(Math.random(), 2)) <= 1 ? 2 : 4;
    for (let x = 1; x <= this.xmax; x++) {
      for (let y = 1; y <= this.ymax; y++) {
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
  isGameover() {
    // まだ空きがある場合OK
    if (this.tiles.length < this.xmax * this.ymax)
      return false;
    for (let x = 1; x <= this.xmax; x++) {
      for (let y = 1; y <= this.ymax; y++) {
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
  save(score) {
    let bs = this.load();
    if (score > bs) {
      localStorage.setItem('best_score', Number(score));
    }
  }
  load() {
    let best_score = localStorage.getItem('best_score');
    if (best_score == undefined || best_score == null) {
      best_score = 0;
    }
    return best_score;
  }
}
