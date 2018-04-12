import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { HeaderComponent } from './header/header.component';
import { InMemoryDataService }  from './in-memory-data.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserService } from './user.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
