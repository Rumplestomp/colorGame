var numSquares = 6;
var colors = [];
var pickedColor;
//initial object grabbing
var squares = document.querySelectorAll(".square");
var colorDis = document.getElementById("rgbValText");
var display = document.getElementById("message");
var h1 = document.querySelector("h1");
var defaultColor = "#565656";
var delta;
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
            //remove selected class from all other buttons
            for (var i=0; i<modeButtons.length; i++){
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            // update correspoding new colors
            if(this.textContent === "Easy"){
                numSquares = 3;
                delta = null;
            }else if(this.textContent === "Hard"){
                numSquares = 6;
                delta = null;
            }else if(this.textContent === "Extreme"){
                numSquares = 6;
                delta = 60;
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
    // if we are on extreme mode, chose colors using delta for smaller differences
    if (delta){
        var first = threeRGBnums();
        var stringColor = "rgb(" + first[0] + ", "+ first[1] + ", " + first[2] + ")";
        arr.push(stringColor);
        for (var i=1; i<numColors; i++){
            arr.push(getRandomSimilarColor(first[0],first[1],first[2]))
        }

    }else{
        for (var i =0; i < numColors; i++){
            arr.push(getRandomColor())
        }
    }
    return arr;

}

/** returns array of three random numbers, ranging from 0-255 */
function threeRGBnums(){
    var red = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    return [red, blue, green];
}

/**returns the string of a random rgb value, formatted for CSS */
function getRandomColor(){
    var rgbs = threeRGBnums();
    return "rgb(" + rgbs[0] + ", "+ rgbs[1] + ", " + rgbs[2] + ")";
}

/** this function returns a color which is very similiar to the one in given rbg form */
function getRandomSimilarColor(r, g, b){
    var negate = randomNegative();
    var red = Math.abs(r + (negate)*Math.floor(Math.random()*delta));
    var negate = randomNegative();
    var green = Math.abs(b - (negate)*Math.floor(Math.random()*delta));
    var negate = randomNegative();
    var blue = Math.abs(g - (negate)*Math.floor(Math.random()*delta));

    // make sure values dont surpass 255
    var colorlist = [red, green, blue];
    for (var i =0; i < colorlist.length; i++){
        if (colorlist[i]>255){
            colorlist[i] = 255-(colorlist[i]-255);
        }
    }
    return "rgb(" + colorlist[0] + ", "+ colorlist[1] + ", " + colorlist[2] + ")";
}

/** randomly either returns -1 or 1 */
function randomNegative(){
    var rand = Math.random();
    return rand<0.5 ? -1 : 1
}