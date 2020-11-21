import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MinieditorVcModule} from 'minieditor-vc';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MinieditorVcModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
