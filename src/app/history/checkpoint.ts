import { Action } from './action';

export class Checkpoint {
  children: Array<Checkpoint>;
  action: Action;
}
