import { Component, OnInit } from '@angular/core';

import { Add as AddPiece } from 'app/tools/piece/add';
import { Remove as RemovePiece } from 'app/tools/piece/remove';
import { Move as MovePiece } from 'app/tools/piece/move';
import { ToolService } from 'app/tools/tool.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  keyboardShortcut = {
    add: '+',
    remove: '-',
    move: 'v',
  };

  constructor(private toolService: ToolService) { }

  ngOnInit() {
    this.toolService.addTool(new AddPiece(this.keyboardShortcut.add));
    this.toolService.addTool(new RemovePiece(this.keyboardShortcut.remove));
    this.toolService.addTool(new MovePiece(this.keyboardShortcut.move));
  }

  setTool() {
    const liText= (<HTMLLIElement>event.target).innerText.toLocaleLowerCase();
    const shortcut = this.keyboardShortcut[liText];
    this.toolService.setToolByKey(shortcut);
  }
}
