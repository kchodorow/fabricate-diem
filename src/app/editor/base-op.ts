import * as moment from 'moment';

export class BaseOp {
  ts: moment.Moment;

  exec() {
  }

  undo() {
  }
}

export NULL_OP = new BaseOp();
