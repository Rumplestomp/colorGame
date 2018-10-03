var squares = document.querySelectorAll(".square");
var numSquares = 6;
var colors= generateColors(numSquares);
//initial setup
var pickedColor=colors[pickColor(numSquares)];
var colorDis = document.getElementById("rgbValText");
colorDis.textContent = pickedColor;
var display = document.getElementById("message");
var h1 = document.querySelector("h1");

var easyBtn = document.getElementById("easy");
var hardBtn = document.getElementById("hard");

easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares = 3;
    colors = generateColors(numSquares);
    pickedColor = colors[pickColor(numSquares)];
    colorDis.textContent = pickedColor;
    for (var i=0; i< squares.length; i++){
        // if there are colors at the index
        if (colors[i]){
            squares[i].style.backgroundColor=colors[i];
        } else{
            squares[i].style.display = "none";
        }
    }
})

hardBtn.addEventListener("click", function(){
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numSquares = 6;
    colors = generateColors(numSquares);
    pickedColor = colors[pickColor(numSquares)];
    colorDis.textContent = pickedColor;
    for (var i=0; i< squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }

})

var resetButton = document.getElementById("reset");

resetButton.addEventListener("click", function(){
    //refresh color array, pickedColor and text in header.
    colors = generateColors(numSquares);
    pickedColor = colors[pickColor(numSquares)];
    colorDis.textContent = pickedColor;
    // refresh squares
    for (var i=0; i< squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "#565656";
    display.textContent = "";
    this.textContent = "NEW COLORS";
});


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
            display.textContent="lol u dum";
           this.style.backgroundColor="#565656"
        }

    });
}


function changeColors(color){
    for (var i = 0; i < colors.length ; i++){
        squares[i].style.backgroundColor=color;
    }

}

/*
will return  int between 0 and numItems-1
*/
function pickColor(numItems){
    
    var rand = Math.floor(Math.random() * numItems);
    return rand
}
/* generates a string array of rgb values in the form
   rgb(x, y, z)*/
function generateColors(numColors){
    var arr = [];
    for (var i =0; i < numColors; i++){
        arr.push(getRandomColor())
    }
    return arr;

}
function getRandomColor(){
    var red = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    return "rgb(" + red + ", "+ green + ", " + blue + ")";
}