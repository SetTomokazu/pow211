class Tile {
  static index_seed = 0;
  constructor(val, pos) {
    this.value = val;
    this.position = pos;
    this.id = Tile.index_seed++;
    let elm = document.createElement("div");
    elm.setAttribute("id", this.id);
    elm.setAttribute("class", `tile val${this.value} row${this.position.y} col${this.position.x}`);
    elm.innerText = this.value;
    this.elm = document.getElementById("ground").appendChild(elm);
  }
  setValue(val) {
    this.elm.classList.replace("val" + this.value, "val" + val);
    this.elm.innerText = val;
    this.value = val;
  }
  move(x, y) {
    this.elm.classList.replace("row" + this.position.y, "row" + y);
    this.elm.classList.replace("col" + this.position.x, "col" + x);
    this.position.x = x;
    this.position.y = y;
  }
  remove() {
    this.elm.parentNode.removeChild(this.elm);
  }
}