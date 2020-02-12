const BaseTask = require("../index").BaseTask;
const ZoneManager = require("../index").ZoneManager;

class MacroTask extends BaseTask {
  start() {
    setInterval(() => {
      console.log("Task One is Running");
    }, 1000);
  }
}

const zoneMgInstance = ZoneManager.get();
zoneMgInstance.load("task-one", new MacroTask());

setTimeout(() => {
    zoneMgInstance.unload("task-one");
}, 3000);
