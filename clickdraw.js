//Michael Ruvinshteyn
//SoftDev2 pd07
//K00 -- I See a Red Door...
//2018 - 02 - 02

//initialize canvas controls
var c = document.getElementById('slate');
var ctx = c.getContext('2d');
ctx.fillStyle = '#000000';

//variables used for drawing
var mouseX;
var mouseY;
var mode = 'dot';
var dotSize = 1;
var corners = 0;
var dots = 0;
var rects = 0;
var cornerX;
var cornerY; 

//allows the user to change the fill color
var changeColName = function(){
    var name = document.getElementById('col').value;
    var par = document.getElementById('coltext');
    par.innerHTML = name;
    //console.log(name);
    ctx.fillStyle = name;
    console.log(ctx.fillStyle);
}

//allows the user to clear the entire canvas
var clearCanvas = function(){
    dots = 0;
    rects = 0;
    var width = c.getAttribute('width');
    var height = c.getAttribute('height');
    //console.log(width);
    //console.log(height);
    ctx.clearRect(0,0,width,height);
    if (mode == 'dot'){
        document.getElementById('status').innerHTML = "Current Mode: Dot";
        document.getElementById('status').innerHTML = "Dots drawn: " + dots;
    }
    else{
        document.getElementById('mode').innerHTML = "Current Mode: Rectangle";
        document.getElementById('status').innerHTML = "Rectangles drawn: " + rects;
    }
}

//gets mouse position
var getMousePos = function(e){
    var r = c.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
    //console.log(mouseX);
    //console.log(mouseY);
}

//toggles drawing mode
var toggle = function(){
    if (mode == 'dot'){
        mode = 'rectangle';
        document.getElementById('mode').innerHTML = "Current Mode: Rectangle";
        document.getElementById('status').innerHTML = "Rectangles drawn: " + rects;
        document.getElementById('dotSize').innerHTML = "";
    }
    else{
        corners = 0;
        mode = 'dot';
        document.getElementById('mode').innerHTML = "Current Mode: Dot";
        document.getElementById('status').innerHTML = "Dots drawn: " + dots;
        document.getElementById('dotSize').innerHTML = "Dot Size: <input type='number' min=1 value=1 id='size'> &nbsp; <button id='subSize'>Change Dot Size</button>";
    }
    //console.log(mode);
}

//changes dot size according to user
var changeDotSize = function(){
    var newSize = document.getElementById('size').value;
    if (newSize != null || newSize >= 0){
        dotSize = newSize;
    }
    else{
        dotSize = 1;
    }
}

//draws according to mode
var draw = function(e){
    getMousePos(e);
    if (mode == 'dot'){
        ctx.fillRect(mouseX-(dotSize/2),mouseY-(dotSize/2),dotSize,dotSize);
        dots += 1;
        document.getElementById('status').innerHTML = "Dots drawn: " + dots;
    }
    else{
        if (corners == 0){
            corners = 1;
            cornerX = mouseX;
            cornerY = mouseY;
        }
        else{
            corners = 0;
            var rectWidth = mouseX - cornerX;
            var rectHeight = mouseY - cornerY;
            ctx.fillRect(cornerX, cornerY, rectWidth, rectHeight);
            cornerX = null;
            cornerY = null;
            rects += 1;
            document.getElementById('status').innerHTML = "Rectangles drawn: " + rects;
        }
    }
}

//adds event listeners to initialize the buttons
document.getElementById('colName').addEventListener('click',changeColName);
document.getElementById('changeSize').addEventListener('click',changeDotSize);
document.getElementById('toggleMode').addEventListener('click',toggle);
document.getElementById('clearCanv').addEventListener('click',clearCanvas)
c.addEventListener('click',draw);

changeColName();
clearCanvas();
document.getElementById('status').innerHTML = "Dots drawn: " + dots;