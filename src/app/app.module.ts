import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MontyHallComponent } from './monty-hall/monty-hall.component';
import { DoorComponent } from './door/door.component';

@NgModule({
  declarations: [
    AppComponent,
    MontyHallComponent,
    DoorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
