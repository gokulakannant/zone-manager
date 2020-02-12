class ZoneSpec {
  constructor(name) {
    this.name = name;
    this.properties = {};
    this._eventTasks = [];
    this._zoneTasks = [];
  }

  onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
    console.log(error);
  }

  onInvokeTask(parentZoneDelegate, currentZone, targetZone, task, ...args) {
    return parentZoneDelegate.invokeTask(targetZone, task, ...args);
  }

  onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
    console.log(task.type);
    if (task.type === "macroTask" || task.type === "microTask") {
      this._zoneTasks.push(task);
    } else {
      this._eventTasks.push(task);
    }
    return parentZoneDelegate.scheduleTask(targetZone, task);
  }

  cleanup() {
    while (this._eventTasks.length) {
      let task;
      try {
        task = this._eventTasks.pop();
        if (task.state != `notScheduled`) Zone.current.cancelTask(task);
      } catch (e) {
        console.error("error::" + e.message);
      }
    }

    while (this._zoneTasks.length) {
      let task = this._zoneTasks.pop();
      clearInterval(task.data.handleId);
    }
  }
}

module.exports.ZoneSpec = ZoneSpec;
