import logger from "~/assets/js/logger";

export default class EventEmitter {
  /**
   * Constructor
   */
  constructor() {
    this._callbacks = {};
  }

  /**
   * On
   */
  on(eventName, callback) {
    if (typeof callback !== "function") {
      return logger.error("callback must be a function!");
    }

    if (!this._callbacks[eventName]) {
      this._callbacks[eventName] = [];
    }

    this._callbacks[eventName].push(callback);
  }

  /**
   * Off
   */
  off(eventName) {
    this._callbacks[eventName] = [];
  }

  /**
   * Trigger
   */
  trigger(eventName, event) {
    if (this._callbacks[eventName]) {
      this._callbacks[eventName].forEach(callback => callback(event));
    }
  }
}
