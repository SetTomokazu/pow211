class Game {
  constructor() {
    this.tiles = [];
    this.score = 0;
  }
  start() {
    this.tiles.push(new Tile(2, new Vector2(1, 3)));
  }
  move(key) {
    switch (key) {
      case 37: this._moveLeft(); break;// left
      case 38: this._moveUp(); break;// up
      case 39: this._moveRight(); break;// right
      case 40: this._moveDown(); break;// down
    }
    this.spawn();
    document.getElementById("score").innerText = this.score;
  }
  _moveUp() {
    for (let x = 1; x <= 4; x++) {
      let top = null;
      let count = 0;
      for (let y = 1; y <= 4; y++) {
        let t = this.tiles.find(t => t.position.x == x && t.position.y == y);
        if (t) {
          if (top) {
            if (top.value == t.value) {
              t.setValue(t.value * 2);
              this.score += t.value;
              t.move(x, count);
              top.remove();
              this.tiles = this.tiles.filter(a => a != top);
              top = t;
            } else {
              count++;
              top = t;
              t.move(x, count);
            }
          } else {
            count++;
            top = t;
            t.move(x, count);
          }
        }
      }
    }
  }
  _moveDown() {
    for (let x = 1; x <= 4; x++) {
      let top = null;
      let count = 5;
      for (let y = 4; y >= 1; y--) {
        let t = this.tiles.find(t => t.position.x == x && t.position.y == y);
        if (t) {
          if (top) {
            if (top.value == t.value) {
              t.setValue(t.value * 2);
              this.score += t.value;
              t.move(x, count);
              top.remove();
              this.tiles = this.tiles.filter(a => a != top);
              top = t;
            } else {
              count--;
              top = t;
              t.move(x, count);
            }
          } else {
            count--;
            top = t;
            t.move(x, count);
          }
        }
      }
    }
  }
  _moveRight() {
    for (let y = 1; y <= 4; y++) {
      let top = null;
      let count = 5;
      for (let x = 4; x >= 1; x--) {
        let t = this.tiles.find(t => t.position.x == x && t.position.y == y);
        if (t) {
          if (top) {
            if (top.value == t.value) {
              t.setValue(t.value * 2);
              this.score += t.value;
              t.move(count, y);
              top.remove();
              this.tiles = this.tiles.filter(a => a != top);
              top = t;
            } else {
              count--;
              top = t;
              t.move(count, y);
            }
          } else {
            count--;
            top = t;
            t.move(count, y);
          }
        }
      }
    }
  }
  _moveLeft() {
    for (let y = 1; y <= 4; y++) {
      let top = null;
      let count = 0;
      for (let x = 1; x <= 4; x++) {
        let t = this.tiles.find(t => t.position.x == x && t.position.y == y);
        if (t) {
          if (top) {
            if (top.value == t.value) {
              t.setValue(t.value * 2);
              this.score += t.value;
              t.move(count, y);
              top.remove();
              this.tiles = this.tiles.filter(a => a != top);
              top = t;
            } else {
              count++;
              top = t;
              t.move(count, y);
            }
          } else {
            count++;
            top = t;
            t.move(count, y);
          }
        }
      }
    }
  }
  spawn() {
    let rnd = Math.floor(Math.random() * (16 + 1)) + 1;
    let val = (Math.floor(Math.random() * (1 + 1)) + 1) * 2;
    console.log("rnd:" + rnd + " val:" + val);
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
}
