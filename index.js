var Zone = require("./zone/index").getZone();
var ZoneSpec = require("./zone/zoneSpec").ZoneSpec;
const EventEmitter = require("eventemitter3").EventEmitter;

class BaseTask extends EventEmitter {
  start() {
    console.log("BaseTask:: start");
  }
}

class ZoneManager {
  constructor() {
    this._zoneMap = new Map();
    this._zoneSpecMap = new Map();
  }

  static get() {
    return this._instance || (this._instance = new ZoneManager());
  }

  _getZone(taskName) {
    if (!this._zoneMap.has(taskName)) {
      let zoneSpec = new ZoneSpec(taskName);
      this._zoneMap.set(taskName, Zone.current.fork(zoneSpec));
      this._zoneSpecMap.set(taskName, zoneSpec);
    }

    return this._zoneMap.get(taskName);
  }

  load(taskName, taskInstance) {
    this._getZone(taskName).runGuarded(() => {
      taskInstance.start();
    });
  }

  unload(taskName) {
    if (this._zoneMap.has(taskName)) {
      Zone.current.runGuarded(() => {
        this._zoneSpecMap.get(taskName).cleanup();
        this._zoneMap.delete(taskName);
        this._zoneSpecMap.delete(taskName);
      });
    }
  }
}

module.exports = {
  BaseTask,
  ZoneManager
};
