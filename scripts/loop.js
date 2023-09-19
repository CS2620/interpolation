function changeScene(index) {
  window.i = i
  o.newSceneIndex = index;
  o.sceneChange = true;
  bootOptions();
};

function bootLoop() {
  //Game loop only
  if (typeof start === "function") {
    start()
  }

  //Scenes, Game Objects, and/or components
  if (typeof scenes != "undefined") {
    //Bootstrap the scene architecture as needed
    o.currentScene = 0;
    o.sceneChange = false;

    if (typeof cs().start === "function")
      cs().start()
  }
  ///Start a timer
  if (!(typeof o.tickOnce !== "undefined" && o.tickOnce))
    o.intervalId = setInterval(tick, o.millisecondsBetweenFrames); ///Initialize the timer

}

function tick() {
  if(o.abort){
    clearInterval(o.intervalId)
  }
  try {
    //Update the global model
    update();
    drawCanvas();
  }catch(error){
    console.error(error)
    o.abort = true;
  }
}

function update() {
  //Update the input class
  i.update();

  //Do we have a pending scene change?
  //This allows the scene change to happen at 
  //predictable times
  if (o?.sceneChange) {
    o.sceneChange = false;
    o.currentScene = o.newSceneIndex;
    //Reboot everything
    if (typeof cs()?.start === "function")
      cs().start()
  }

  //If there is a custom update function, call it.

  //Loop-only updates
  if (typeof customUpdate === "function") {
    customUpdate();
  }

  //Scenes-level updates
  if (typeof cs()?.customUpdate === "function") cs().customUpdate()

  //Game Objects and Components
  //First start any game objects
  for (let go of (cs()?.gameObjects ?? [])) {
    if (!go.started) {
      if (typeof go.start == "function")
        go.start();
      go.started = true;
    }
  }

  //Now update game objects
  for (let go of (cs()?.gameObjects ?? [])) {
    // Game Objects
    if (typeof go.update === "function")
      go.update(c, o);
  }

  //Now go through components
  for (let go of (cs()?.gameObjects ?? [])) {
    for (let component of (go?.components ?? [])) {
      //Start Components
      if (!component.started) {
        if (typeof component.start === "function") {
          component.start();
        }
        component.started = true;
      }
    }
    for (let component of (go?.components ?? [])) {
      // Update Components
      if (typeof component.update === "function") {
        component.update()
      }
    }
  }

}

///Called whenever the canvas needs to be redrawn
function drawCanvas() {

  //Update the canvas size in case there has been a change
  resizeCanvas()

  ///Clear the rectangles
  c.fillStyle = o.fillColor;
  c.fillRect(0, 0, canvas.width, canvas.height);

  if (o.drawGrid && !o.drawGridInFront)
    $$.drawTheGrid()

  //Save transform before we account for the camera
  c.save();

  //Adjust for the camera
  c.translate(o.width / 2 - o.cameraCenterX, o.height / 2 - o.cameraCenterY);
  c.scale(o.cameraZoom, -o.cameraZoom);

  // Loop-only version
  if (typeof draw === "function") {
    draw(c, o);
  }

  //Scene-only version
  if (typeof cs()?.draw === "function") cs().draw(c, o)

  //Game Object-only version
  for (let go of (cs()?.gameObjects ?? [])) {
    if (typeof go.draw === "function")
      go.draw(c, o);
  }

  //Components
  for (let go of (cs()?.gameObjects ?? [])) {
    for (let c of (go?.components ?? [])) {
      if (typeof c.draw === "function") {
        c.draw();
      }
    }
  }


  //Restore to pre-camera transform state
  c.restore();

  if (o.drawGrid && o.drawGridInFront)
    $$.drawTheGrid()

  //Call drawUI if the user has created this function
  if (typeof drawUI == "function") drawUI()

  //Call drawUI if the user has created this function on the scene
  if (typeof cs()?.drawUI === "function") cs().drawUI(c, o)

  //Game Objects
  for (let go of (cs()?.gameObjects ?? [])) {
    if (typeof go.drawUI === "function")
      go.drawUI(c, o);
  }


  //Components
  for (let go of (cs()?.gameObjects ?? [])) {
    for (let c of (go?.components ?? [])) {
      if (typeof c.drawUI === "function") {
        c.drawUI();
      }
    }
  }
}