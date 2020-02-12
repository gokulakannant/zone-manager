const BaseTask = require("../index").BaseTask;
const ZoneManager = require("../index").ZoneManager;

class EventTask extends BaseTask {
    start() {
        // setInterval(() => {
            this.emit("oneventtask");
        // }, 1000);
    }
}

const evtTaskInstance = new EventTask();
evtTaskInstance.addListener("oneventtask", () =>
    console.log("'oneventtask' event received.")
);

const zoneMgInstance = ZoneManager.get();
zoneMgInstance.load("task-three", evtTaskInstance);

setTimeout(() => {
    console.log("Unloading task-three");
    zoneMgInstance.unload("task-three");
}, 3000);
