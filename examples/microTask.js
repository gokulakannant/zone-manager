const BaseTask = require("../index").BaseTask;
const ZoneManager = require("../index").ZoneManager;

class MicroTask extends BaseTask {
  promiseMethod() {
    return Promise.resolve(true);
  }

  start() {
    this.promiseMethod().then(response => {
      console.log("Promise resolved");
    });
  }
}

const zoneMgInstance = ZoneManager.get();
zoneMgInstance.load("task-two", new MicroTask());

setTimeout(() => {
    console.log("Unloading task-two");
    zoneMgInstance.unload("task-two");
}, 3000);
