grid = document.querySelector(".grid");
let clickDown = false;
cells = [];

let width = 16;
let height = 16;

document.addEventListener("mousedown", ()=>{clickDown = true});
document.addEventListener("mouseup", ()=>{clickDown = false});

for(let i = 0; i<width*height; i++){
    cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
    cells.push(cell);

    cell.addEventListener('mouseenter', fillDrag);
    cell.addEventListener('mousedown', fillClick);

    cell.addEventListener('dragstart', function(event) {
        event.preventDefault();
      });
}



function fillDrag(){
    if(clickDown)this.style.backgroundColor = "black";
}

function fillClick(){
    this.style.backgroundColor = "black";
}
