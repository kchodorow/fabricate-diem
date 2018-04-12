import { Injectable } from '@angular/core';

import { Tool } from './tool';

@Injectable()
export class ToolService {
  currentTool: Tool;
  tools: Object;

  constructor() { }

  addTool(tool: Tool) {
    this.tools[tool.name] = tool;
  }

  setTool(toolName: string) {
    this.currentTool.disable();
    this.currentTool = this.tools[toolName];
    this.currentTool.enable();
  }

}
