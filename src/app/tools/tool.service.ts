import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { NotFoundError } from 'app/errors/not-found';

import { Tool } from './tool';

@Injectable()
export class ToolService {
  currentTool: Tool;
  tools: Array<Tool> = [];

  constructor() { }

  addTool(tool: Tool) {
    this.tools.push(tool);
  }

  getToolByEvent(event: any) {
    const key = String.fromCharCode(event.which);
    console.log(`pressed ${key}`);
    return _.find(this.tools, tool => tool.key === key);
  }

  setTool(tool: Tool) {
    if (this.currentTool === tool) {
      return;
    }
    // this.currentTool is initially null.
    if (this.currentTool) {
      this.currentTool.disable();
    }
    this.currentTool = tool;
    this.currentTool.enable();
  }

  setToolByKey(toolKey: string) {
    const tool = _.find(this.tools, tool => tool.key === toolKey);
    if (!tool) {
      throw new NotFoundError(`Tool ${toolKey} not found`);
    }
    this.setTool(tool);
  }
}
