$$ = {}

/**
 * Begin path shorthand
 * @returns 
 */
$$.b = function () {
  c.beginPath();
  return this;
}

/**
 * Move to a point. Must be called after beginPath or $$.b
 * @param {Number} x x coordinate to move to
 * @param {Number} y y coordinate to move to
 * @returns 
 */
$$.m = function (x, y) {
  c.moveTo(x, y)
  return this;
}

/**
 * Line to a point. Must be called after beginPath or $$.b
 * @param {Number} x x coordinate to draw to
 * @param {Number} y y coordinate to draw to
 * @returns 
 */
$$.l = function (x, y) {
  c.lineTo(x, y);
  return this;
}

/**
 * Stroke a path. Must be called after beginPath or $$.b
 * @returns 
 */
$$.s = function () {
  c.stroke();
  return this;
}

/**
 * Fill a path. Must be called after beginPath or $$.b
 * @returns 
 */
$$.f = function () {
  c.fill();
  return this;
}
/**
 * Set the stroke style
 * @returns 
 */
$$.st = function (style) {
  c.strokeStyle = style;
  return this;
}

/**
 * Set the fill style
 * @returns 
 */
$$.fi = function (style) {
  c.fillStyle = style;
  return this;
}

/**
 * Set the font
 * @returns 
 */
$$.fo = function (font) {
  c.font = font
  return this;
}

/**
 * Fill text
 * @returns 
 */
$$.text = function (text, x, y) {
  c.fillText(text, x, y);
  return this;
}

/**
 * Fill text centered
 * @returns 
 */
$$.tc = function (t, x, y) {//Draw text centered
  let mt = c.measureText(t)
  this.text(t, x - mt.width / 2, y - mt.fontBoundingBoxAscent / 2)
  return this
}

/**
 * Draw a circle as part of a path
 * @returns 
 */
$$.circle = function (x, y, r) {
  c.arc(x, y, r, 0, Math.PI * 2)
  return this;
}

/**
 * Fill centered rectangle
 * @returns 
 */
$$.fillRectCentered = function (x, y, rx, ry) {
  c.fillRect(x - rx, y - ry, rx * 2, ry * 2);
  return this;
}

/**
 * Fill rectangle
 * @returns 
 */
$$.fillRect = function (x, y, rx, ry) {
  c.fillRect(x, y, rx, ry);
  return this;
}

/**
 * Stroke a path
 * @returns 
 */
$$.line = function (x, y, x2, y2) {
  c.beginPath()
  c.moveTo(x, y)
  c.lineTo(x2, y2)
  c.stroke()
}

/**
 * Draw a grid on the screen
 */
$$.drawTheGrid = function() {
  //Draw a grid in UI space before anythig else if the user
  //has requested it

  $$.fo("10px Arial").fi("white")

  //The coordinates of the upper left (ul) and lower right (lr) coordinates
  let ulx, uly;
  [ulx, uly] = toWorldSpace(0, 0)
  let lrx, lry;
  [lrx, lry] = toWorldSpace(c.canvas.width, c.canvas.height)

  let startX, startY, stopX, stopY;

  //Set an arbitrary base
  let base = 10;
  let min = Math.min(lrx - ulx, lry - uly);
  let step = Math.log10(min) / Math.log10(base);
  step = Math.floor(step - .5);
  step = Math.pow(base, step);

  startX = parseInt((ulx - step) / step) * step
  stopX = lrx
  startY = parseInt((uly - step) / step) * step
  stopY = lry;

  for (let x = startX; x <= stopX; x += step) {
    let tx, ty, t2;
    [tx, ty] = toScreenSpace(x, startY);
    [tx, t2] = toScreenSpace(x, stopY);

    $$.st("black").line(tx - 1, ty, tx - 1, t2)

    c.strokeStyle = "white";
    if (x == 0)
      c.strokeStyle = "green"
    c.beginPath()
    c.moveTo(tx, ty);
    c.lineTo(tx, t2)
    c.stroke()

    c.fillStyle = "white"
    c.fillText(x.toFixed(2), tx + 20, 20);
    c.fillStyle = "black"
    c.fillText(x.toFixed(2), tx + 20 - 1, 20 - 1);
  }
  for (let y = startY; y <= stopY; y += step) {
    let tx, ty, tx2;
    [tx, ty] = toScreenSpace(startX, y);
    [tx2, ty] = toScreenSpace(stopX, y);

    $$.st("black").line(tx, ty - 1, tx2, ty - 1)
    c.strokeStyle = "white";
    if (y == 0)
      c.strokeStyle = "red"
    c.beginPath()
    c.moveTo(tx, ty);
    c.lineTo(tx2, ty)
    c.stroke()

    c.fillStyle = "white"
    c.fillText((-y).toFixed(2), 20, ty + 20);
    c.fillStyle = "black"
    c.fillText((-y).toFixed(2), 20 - 1, ty + 20 - 1);
  }
}