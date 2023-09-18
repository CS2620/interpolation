findGameObject = function (name) {
  if (!cs()) return null
  if (!cs().gameObjects) return null;
  //Implied else
  return cs().gameObjects.find(go => go.started && go.name == name);
}
findGameObjects = function (name) {
  if (!cs()) return null
  if (!cs().gameObjects) return null;
  //Implied else
  return cs().gameObjects.filter(go => go.started && go.name == name);
}

getGameObjects = function () {
  if (!cs()) return null;
  return cs().gameObjects
}