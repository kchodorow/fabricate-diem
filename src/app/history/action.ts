import * as moment from 'moment';

export class Action {
  description: string;
  hash: string;
  parent?: Action;
  ts: moment.Moment;

  isRoot() {
    return !parent;
  }
}
