import { Component, OnInit } from '@angular/core';

import { ToolService } from 'app/tools/tool.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private toolService: ToolService) { }

  ngOnInit() {
  }

  setTool(toolName: string) {
    this.toolService.setTool(toolName);
  }

}
