import * as moment from 'moment';

export class BaseOp {
  ts: moment.Moment;

  exec() {
    throw Error("Redo not implemented");
  }

  undo() {
    throw Error("Undo not implemented");
  }
}
