grid = document.querySelector(".grid");
buttons = document.querySelectorAll("button.radio");
clearButton = document.querySelector("#clear")
colorInput = document.querySelector("#input-color");
recentColors = document.querySelector(".recent-colors");
sizeInput = document.querySelector("#input-size");
sizeInputLabel = document.querySelector("#input-size-label");
cells = [];
let clickDown = false;
let currentOption = "draw";

class Cell {

    constructor(cell){

        this.element = cell;
        this.darken = false;
        this.brightness = 1;

        element.addEventListener('mouseenter', ()=>this.fillDrag());
        element.addEventListener('mousedown', ()=>this.fill());
        this.element.style.backgroundColor = "rgb(255,255,255)"

        cell.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
    }

    clear(){
        this.element.style.backgroundColor = "white";
        this.reset();
    }

    reset(){
        this.darken = false;
        this.brightness = 1;
    }

    fill(){
        switch(currentOption){
            case "draw":
                this.element.style.backgroundColor = document.querySelector("#input-color").value;;
                this.reset();
                break;
            case "erase":
                this.clear();
                break;
            case "rainbow":
                this.element.style.backgroundColor = this.randomColor();
                this.reset();
                break;
            case "darken":
                if(this.darken){
                    this.brightness = Math.max(this.brightness - .1, 0)
                }
                console.log(this.element.style.backgroundColor)
                this.element.style.backgroundColor = this.darkenColor(this.element.style.backgroundColor.match(/\d+/g));
                this.darken = true;
                break;
        }
        
    }
    fillDrag(){
        if(clickDown) this.fill();
    }

    randomColor(){
        let red = Math.round(Math.random() * 255) * this.brightness;
        let green = Math.round(Math.random() * 255) * this.brightness;
        let blue = Math.round(Math.random() * 255) * this.brightness;
        return `rgb(${red},${green},${blue})`;
    }

    darkenColor(values){
        let red = values[0] * this.brightness;
        let green = values[1] * this.brightness;
        let blue = values[2] * this.brightness;
        return `rgb(${red},${green},${blue})`;
    }
}

function generateCells(){
    for(let i = 0; i<height; i++){
        row = document.createElement("div");
        row.classList.add("row");
        grid.appendChild(row);
    
        for(let i = 0; i<width; i++){
            element = document.createElement("div");
            element.classList.add("cell");
            row.appendChild(element);
            newCell = new Cell(element);
            cells.push(newCell);
        }
    }
}

function deleteGrid(){
    cells = [];
    grid.innerHTML = "";
}

function rgbToHex(rgbString) {
    const colors = rgbString.match(/\d+/g);
    if (!colors || colors.length !== 3) {
      return '#000000'; // Default to black for invalid input
    }
  
    return `#${parseInt(colors[0], 10).toString(16).padStart(2, '0')}${parseInt(colors[1], 10).toString(16).padStart(2, '0')}${parseInt(colors[2], 10).toString(16).padStart(2, '0')}`;
}

function radioButtons(button){
    buttons.forEach(button => {
        button.classList.remove("selected");
    });
    button.classList.add("selected");
    currentOption = button.id;
}

let width = 16;
let height = 16;

document.addEventListener("mousedown", ()=>{clickDown = true});
document.addEventListener("mouseup", ()=>{clickDown = false});

buttons.forEach(button => {
    button.addEventListener("click",()=>{
        buttons.forEach(button => {
            button.classList.remove("selected");
        });
        button.classList.add("selected");
        currentOption = button.id;
    })
});

clearButton.addEventListener('click',() => {
    cells.forEach((cell)=>{
        cell.clear();
    })
})

colorInput.addEventListener('change', (e) => {
    newSwatch = document.createElement("div");
    newSwatch.style.backgroundColor = colorInput.value;

    newSwatch.addEventListener('click', (e) => {
        console.log(e.target.style.backgroundColor, colorInput.value)
        colorInput.value = rgbToHex(e.target.style.backgroundColor);

        buttons.forEach(button => {
            button.classList.remove("selected");
        });
        document.querySelector("#draw").classList.add("selected");
        currentOption = "draw";

    });

    recentColors.appendChild(newSwatch);
})

sizeInput.addEventListener('change', (e) => {
    sizeInputLabel.innerHTML = `${e.target.value} x ${e.target.value}`
    deleteGrid();
    width = height = e.target.value;
    document.documentElement.style.setProperty('--grid-cells', e.target.value);
    generateCells();
})

generateCells();