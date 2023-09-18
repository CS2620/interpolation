# PSM

The game engine that breaks the rules (really).

## About

PSM is an opinionated micro game engine that intentionally pollutes the global name space to make your life easy (and fun).

## Installation

Include ```game.js``` **after** your script code.

```js
<script>
 function start(){
  console.log("hi")
 }
</script>
<script src="game.js">
```

# Usage

PSM comes with four modes out of the box

|Type|Description|Achitecture|
|---|---|---|
|Game Loop + Camera (default) | PSM provides a simple interface to handle game loop calls (e.g. draw, update). It also has a built-in camera that allows for panning and zoom.|None|
|Scene-Based| Scenes allow you to partition your into, well, scenes. This mode is triggered if the game engine sees an object named ```scenes``` in your script. If it is there, it sends the update and draw calls to the current scene.| A game is a collection of scenes that handle events |
|Game Object-Based| Game Object mode lets you put the logic into a game objects within scenes. This has more of a learning curve, but can significantly reduce the complexity of your code.| A game is a collection of scenes and prefabs. Prefabs are instantiated as game objects in scenes and the game objects handle event calls.|
|Component-Based|The mode with the highest learning curve, but hands-down the most power and probably the one with the least code. In component mode the game engine looks for update and draw calls in components that can be reused.| A game is a collection of scenes, prefabs, and components. Game objects are instantiated prefabs with a collection of instantiated components. A scene is a collection of prefabs instantiated as game objects. Events are handled by the components.|