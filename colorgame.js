var numSquares = 6;
var colors = [];
var pickedColor;
//initial object grabbing
var squares = document.querySelectorAll(".square");
var colorDis = document.getElementById("rgbValText");
var display = document.getElementById("message");
var h1 = document.querySelector("h1");
var defaultColor = "#565656";

var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

init();

/**This function initializes the game*/
function init(){
    //setup buttons
    setupButtons();
    setupSquares();
    reset();

}
/**This function is a helper for the main init function */
function setupButtons(){
    for (var i =0; i< modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // update correspoding new colors
            if(this.textContent === "Easy"){
                numSquares = 3;
            }else if(this.textContent === "Hard"){
                numSquares = 6;
            }
            reset();
    
        })// end addEventListener
    }
}

/**This function is a helper for the main init function */
function setupSquares(){
    for (var i = 0; i < squares.length; i++){
        // get random color
        squares[i].style.backgroundColor = colors[i];
        // add event
        squares[i].addEventListener("click", function(){
            var clickedColor=this.style.backgroundColor;
            
            //win event
            if (clickedColor===pickedColor){
                display.textContent="Correct!";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again";
            }
            //lose
            else{
                display.textContent="That's not it Cheif!";
               this.style.backgroundColor="#565656"
            }
    
        });
    }
}

resetButton.addEventListener("click", function(){
    reset();
});

/**This function resets the game, for any difficulty */
function reset(){
    colors = generateColors(numSquares);
    pickedColor = colors[pickColor(numSquares)];
    colorDis.textContent = pickedColor;
    resetButton.textContent = "NEW COLORS";
    for (var i =0;i<squares.length;i++){
        // only assign colors to the amount of squares needed
        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = defaultColor;
    display.textContent="";
}

/**this function sets all of the squares to the color provided */
function changeColors(color){
    for (var i = 0; i < colors.length ; i++){
        squares[i].style.backgroundColor=color;
    }

}

/**will return  int between 0 and numItems-1 */
function pickColor(numItems){
    var rand = Math.floor(Math.random() * numItems);
    return rand
}

/** generates a string array of rgb values in the form rgb(x, y, z)*/
function generateColors(numColors){
    var arr = [];
    for (var i =0; i < numColors; i++){
        arr.push(getRandomColor())
    }
    return arr;

}

/**returns the string of a random rgb value, formatted for CSS */
function getRandomColor(){
    var red = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    return "rgb(" + red + ", "+ green + ", " + blue + ")";
}
