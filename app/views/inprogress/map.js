function(doc) {
// !code vendor/scripts/utils.js
  emitStoriesInStates(doc, ["In progress", "Assigned to sprint", "To do", "To test", "Done"]);
}