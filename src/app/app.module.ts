import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from 'app/app.component';
import { EditorComponent } from 'app/editor/editor.component';
import { HeaderComponent } from 'app/header/header.component';
import { HistoryComponent } from 'app/history/history.component';
import { InMemoryDataService }  from 'app/in-memory-data.service';
import { SidebarComponent } from 'app/sidebar/sidebar.component';
import { ToolService } from 'app/tools/tool.service';
import { UserService } from 'app/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    EditorComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    UserService,
    ToolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
