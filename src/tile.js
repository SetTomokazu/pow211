class Tile {
  static index_seed = 0;
  constructor(val, pos) {
    this.value = val;
    this.position = pos;
    this.id = Tile.index_seed++;
    this.isRemoved = false;
    let elm = document.createElement("div");
    elm.setAttribute("id", this.id);
    elm.setAttribute("class", `tile row${this.position.y} col${this.position.x} spawn`);
    let child = document.createElement("span");
    child.setAttribute("class", `val${this.value}`);
    child.innerText = this.value;
    elm.appendChild(child);
    this.elm = document.getElementById("ground").appendChild(elm);
    this.elm.addEventListener("transitionend", (e) => {
    });
    this.elm.addEventListener("animationend", () => {
      if (this.isRemoved) {
        this.elm.parentNode.removeChild(this.elm);
        return;
      }
      if (this.elm.children.length > 1) {
        this.elm.removeChild(this.elm.firstChild);
      }
    });
  }
  setValue(val) {
    let child = document.createElement("span");
    child.setAttribute("class", `val${val} docking`);
    child.innerText = val;
    this.elm.appendChild(child);
    this.value = val;
  }
  move(x, y) {
    this.elm.classList.replace(`row${this.position.y}`, `row${y}`);
    this.elm.classList.replace(`col${this.position.x}`, `col${x}`);
    this.position.x = x;
    this.position.y = y;
  }
  remove() {
    this.elm.classList.add("dead");
    this.isRemoved=true;
  }
}