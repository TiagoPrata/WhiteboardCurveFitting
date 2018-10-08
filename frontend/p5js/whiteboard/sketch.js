var pointsArrayX = [];
var pointsArrayY = [];

// GUI params
var limX = '100';
var limY = '100';
var poliIndex = 3;
var apply = false;
var formula = '';
var gui;

// whiteboard limits
var wb_X1;
var wb_Y1;
var wb_X2;
var wb_Y2;

// JSON
var jsonXY = {};
var url = 'http://127.0.0.1:5000/api/submitXY'

function setup() {
  createCanvas(windowWidth, windowHeight);

  // whiteboard limits
  wb_X1 = 260;
  wb_Y1 = 40;
  wb_X2 = windowWidth - 50;
  wb_Y2 = windowHeight - 20;

  resetSketch();

  sliderRange(1, 6, 1);
  gui = createGui('Config');
  gui.addGlobals('limX', 'limY', 'poliIndex', 'apply', 'formula');

  // noLoop();
}

function resetSketch() {
  clear();
  jsonXY = {};
  pointsArrayX = [];
  pointsArrayY = [];
  strokeWeight(2);

  // arrows sizes
  var arrowHeight = 15;
  var arrowWidth = 6;

  // drawing lines
  // Y axis
  line(wb_X1, wb_Y1, wb_X1, wb_Y2);
  triangle(wb_X1, wb_Y1 - arrowHeight, wb_X1 - arrowWidth, wb_Y1, wb_X1 + arrowWidth, wb_Y1);
  // X axis
  line(wb_X1, wb_Y2, wb_X2, wb_Y2);
  triangle(wb_X2, wb_Y2 - arrowWidth, wb_X2, wb_Y2 + arrowWidth, wb_X2 + arrowHeight, wb_Y2);
}

function draw() {
  userDrawing();
}

function userDrawing() {
  if (isInsideWhiteboard()) {
    if (mouseIsPressed) {
      strokeWeight(4);
      point(mouseX, mouseY);
      append(pointsArrayX, mouseX)
      append(pointsArrayY, mouseY)
    }
  }
  
}

function isInsideWhiteboard() {
  return ((mouseX > wb_X1) && (mouseX < wb_X2) && (mouseY > wb_Y1) && (mouseY < wb_Y2))
}

function mousePressed() {
  if (isInsideWhiteboard()) {
    clear();
    resetSketch();
  } else {
    jsonXY.X = pointsArrayX;
    jsonXY.Y = pointsArrayY;
    // saveJSON(jsonXY, 'points.json');
    // console.log(jsonXY)

    httpPost(url, 'json', jsonXY, function(result) {
      console.log(result)
    }, function(error) {
      console.log(error.toString())
    })
  }
}

// dynamically adjust the canvas to the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch();
}