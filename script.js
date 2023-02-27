// Constants
const SAMPLE_TIME = 0.1; // seconds
const MAX_VALUE = 100;
const MIN_VALUE = 0;

// Variables
let setpoint = 25;
let kp = 0.5;
let ki = 0.2;
let kd = 0.1;
let error = 0;
let integral = 0;
let derivative = 0;
let last_error = 0;
let output = 0;
let value = 20;
let time = 0;
let data = [];
//lets necesary for another functions
let nIntervId;

// Functions
function calculatePID() {
  error = setpoint - value;
  integral += error * SAMPLE_TIME;
  derivative = (error - last_error) / SAMPLE_TIME;
  output = kp * error + ki * integral + kd * derivative;
  last_error = error;
  //que cumpla con el rango
  if (output > MAX_VALUE) {
    output = MAX_VALUE;
  }
  if (output < MIN_VALUE) {
    output = MIN_VALUE;
  }
}

function updateValue() {
  value += (output - (value / 10)) * SAMPLE_TIME;
  if (value > MAX_VALUE) {
    value = MAX_VALUE;
  }
  if (value < MIN_VALUE) {
    value = MIN_VALUE;
  }
}
var layout = { 
  title: 'PID RESPONSE\n VISUALIZER',
  font: {size: 18}
};
var config = {responsive: true}

function updatePlot() {
  data.push({ x: time, y: value });
  Plotly.newPlot('plot', [{ x: data.map(d => d.x), y: data.map(d => d.y) }], layout,config);
}

function update() {
  calculatePID();
  updateValue();
  updatePlot();
  time += SAMPLE_TIME;
  //setInterval(update,time);
  nIntervId=setTimeout(update,0.1);
}
function stopGraphing(){
  clearTimeout(nIntervId);
  nIntervId=null
}

document.getElementById('setpoint').addEventListener('change', function() {
  setpoint = parseFloat(this.value);
  setpoint1.innerHTML=setpoint
});

document.getElementById('kp').addEventListener('change', function() {
  kp = parseFloat(this.value);
});

document.getElementById('ki').addEventListener('change', function() {
  ki = parseFloat(this.value);
});

document.getElementById('kd').addEventListener('change', function() {
  kd = parseFloat(this.value);
});


function openWin(){
  window.open("./app.html")
  window.close();
}
function closeWin() {
  window.open("./index.html")
  window.close();
}
