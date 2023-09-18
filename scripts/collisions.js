collisionRectRect = function (cx, cy, rx, ry, cx1, cy1, rx1, ry1) {
  const collision = !(cx - rx > cx1 + rx1 || cx + rx < cx1 - rx1 || cy - rx > cy1 + ry1 || cy + ry < cy1 - ry1);
  return collision;
}

interp = function (percent, start, end) {
  return (1 - percent) * start + percent * end
}