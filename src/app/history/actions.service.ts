import { Injectable } from '@angular/core';

import { Action } from './action';

const MAX_NUM_ACTIONS = 10;

// A1 -> A2A -> A3A
//           -> A3B
//    -> A2A
@Injectable()
export class ActionsService {
  actions: Array<Action> = [];

  constructor() { }

  addAction(action: Action) {
    this._update();
    this.actions.push(action);
  }

  getActions() {
    this._update();
    return this.actions;
  }

  _update() {
    if (this.actions.length < MAX_NUM_ACTIONS) {
      return;
    }
    this.actions = this.actions.slice(this.actions.length - MAX_NUM_ACTIONS);
  }
}
