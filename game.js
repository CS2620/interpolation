class Component {
  get transform() {
    return this.parent.transform;
  }
}

class Transform extends Component {
  name = "transform"
  x = 0
  y = 0
  sx = 1
  sy = 1
  r = 0
}

class GameObject {
  name = "Game Object"
  markForDestroy = false
  components = []
  constructor() {
    let transformComponent = new Transform()
    this.components.push(transformComponent)
  }
  addComponent(component) {
    component.parent = this
    this.components.push(component);
  }
  get transform() {
    return this.components[0];
  }
  getComponentByName(name) {
    return this.components.find(c => c.name == name);
  }
}

class RectangleComponent extends Component {
  name = "rectangle"
  fillColor = "white"
  draw() {
    $$.fi(this.fillColor).fillRectCentered(this.transform.x, this.transform.y, this.transform.sx, this.transform.sy)
  }
}

class TextComponent extends Component {
  name = "textComponent"
  text = "[textComponent]"
  fillStyle = "green"
  drawUI() {
    $$.fi(this.fillStyle).fo("40px Arial").tc(this.text, c.canvas.width / 2, c.canvas.height / 2)
  }
}


function bootDocument() {
  document.body.innerHTML += "<canvas id='canv' oncontextmenu='return false;'></canvas>";
  // Add the link that sets the favicon, see https://gist.github.com/chrisyip/1403858

  var link = document.createElement("link");
  link.href = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  link.rel = "icon";
  link.type = "image/x-icon"; // no need for HTML5

  document.getElementsByTagName("head")[0].appendChild(link); // for IE6
  document.body.style.setProperty("margin", "0px");
  document.documentElement.style.setProperty("margin", "0px"); //Apparently you can't do document.html...https://stackoverflow.com/questions/9362907/how-can-i-reference-the-html-elements-corresponding-dom-object
  document.documentElement.style.setProperty("overflow", "hidden"); //Apparently you can't do document.html...https://stackoverflow.com/questions/9362907/how-can-i-reference-the-html-elements-corresponding-dom-object

  //Set the title programmatically

  document.title = "Interpolation";


  let scripts = [
    "./scripts/input.js",
    "./scripts/options.js",
    "./scripts/money.js",
    "./scripts/scenes.js",
    "./scripts/camera.js",
    "./scripts/gameObjects.js",
    "./scripts/collisions.js",
    "./scripts/loop.js"
  ]

  let countLoaded = 0;

  for (let script of scripts) {
    let inputScript = document.createElement("script")
    inputScript.src = script
    document.body.append(inputScript)
    inputScript.onload = () => {
      countLoaded++
      if (countLoaded == scripts.length) {
        this.initialBoot()
      }
    }
  }

}

///This gets called once when the page is completetly loaded.
///Think main()
function initialBoot() {
  canvas = document.getElementById("canv"); ///Get the canvas object
  c = window.canvas.getContext("2d");
  
  document.getElementById("canv").addEventListener("mousemove", e => mouseMove(e));
  document.getElementById("canv").addEventListener("mousedown", e => mouseDown(e));
  document.getElementById("canv").addEventListener("mouseup", e => mouseUp(e));
  document.getElementById("canv").addEventListener("mousewheel", e => mouseWheel(e));


  i.attach(document); //Start the input handling
  ///Make sure everything is the right size
  resizeCanvas();
  //Call the start function if it exists (only called once)
  // if (typeof o.start === "function") {
  //   o.start(c, o);
  // }
  bootLoop()  
}

bootDocument()



