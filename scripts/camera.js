c = {}
canvas = {}

toWorldSpace = function (screenX, screenY) {
  let x = screenX - (o.width / 2 - o.cameraCenterX);
  let y = screenY - (o.height / 2 - o.cameraCenterY);
  x /= o.cameraZoom;
  y /= o.cameraZoom;
  return [x, y];
};

toScreenSpace = function (worldX, worldY) {
  let x = worldX * o.cameraZoom;
  let y = worldY * o.cameraZoom;
  x += o.width / 2 - o.cameraCenterX;
  y += o.height / 2 - o.cameraCenterY;
  return [x, y];
};

lookAt = function (x, y) {
  o.cameraCenterX = x * o.cameraZoom;
  o.cameraCenterY = y * -o.cameraZoom;
  return window;
};

zoom = function (z) {
  let h = c.canvas.height;
  z = h / z;
  o.cameraZoom = z;
  return window;
};

function mouseMove(e) {
  if (this.isCameraDisabled()) return;
  let currentMouseX = e.clientX;
  let currentMouseY = e.clientY;
  if (o.isMouseDown) {
    let diffX = currentMouseX - o.lastMouseX;
    let diffY = currentMouseY - o.lastMouseY;
    o.cameraCenterX -= diffX;
    o.cameraCenterY -= diffY;
  }
  o.lastMouseX = e.clientX;
  o.lastMouseY = e.clientY;
}

function mouseDown(e) {
  if (this.isCameraDisabled()) return;
  o.lastMouseX = e.clientX;
  o.lastMouseY = e.clientY;
  o.isMouseDown = true;
}

function mouseUp(e) {
  if (this.isCameraDisabled()) return;
  let currentMouseX = e.clientX;
  let currentMouseY = e.clientY;
  o.lastMouseX = e.clientX;
  o.lastMouseY = e.clientY;
  o.isMouseDown = false;
}

function mouseWheel(e) {
  if (this.isCameraDisabled()) return;
  //Figure out the current world space coordinate
  let x = e.clientX - (o.width / 2 - o.cameraCenterX);
  let y = e.clientY - (o.height / 2 - o.cameraCenterY);
  x /= o.cameraZoom;
  y /= o.cameraZoom;
  if (e.wheelDelta > 0) {
    o.cameraZoom *= 1.01;
  } else if (e.wheelDelta < 0) {
    o.cameraZoom /= 1.01;
  }
  if (o.cameraZoom > o.maxZoom) {
    o.cameraZoom = o.maxZoom;
  }
  if (o.cameraZoom < o.minZoom) {
    o.cameraZoom = o.minZoom;
  }
  //Now figure out what the new world space coordinate has changed to
  let x2 = e.clientX - (o.width / 2 - o.cameraCenterX);
  let y2 = e.clientY - (o.height / 2 - o.cameraCenterY);
  x2 /= o.cameraZoom;
  y2 /= o.cameraZoom;
  o.cameraCenterX -= x2 - x;
  o.cameraCenterY -= y2 - y;
}
function isCameraDisabled() {
  return typeof o.disableCameraMovement !== "undefined" && o.disableCameraMovement;
}

function resizeCanvas() {
  //Grab the size of the window
  o.width = window.innerWidth;
  o.height = window.innerHeight;
  //set the size of the canvas
  canvas.width = o.width;
  canvas.height = o.height;
}
