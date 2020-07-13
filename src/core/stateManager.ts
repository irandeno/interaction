import { deepExtend, AnyObject } from "./deepExtend.ts";

export class StateManager {
  public readonly state: AnyObject = {};
  constructor(initialState: AnyObject = {}) {
    this.state = initialState;
  }

  setState(newOptions: AnyObject) {
    deepExtend(this.state, newOptions);
  }
}
