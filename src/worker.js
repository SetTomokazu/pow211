class Worker {
  constructor() {
    this.game = new Game();
  }
  draw(key, id) {
    let target = document.getElementById(id);

    let row = target.classList.item(1);
    let col = target.classList.item(2);
    let rowafter = row;
    let colafter = col;

    switch (key) {
      case 37://left
        colafter = "col" + String(Number(col.replace("col", "")) - 1);
        break;
      case 38://up
        rowafter = "row" + String(Number(row.replace("row", "")) - 1);
        break;
      case 39://right
        colafter = "col" + String(Number(col.replace("col", "")) + 1);
        break;
      case 40://down
        rowafter = "row" + String(Number(row.replace("row", "")) + 1);
        break;
    }
    target.classList.replace(row, rowafter);
    target.classList.replace(col, colafter);
  }
}
