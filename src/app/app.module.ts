import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeloMiniEditorModule } from './melo-mini-editor/melo-mini-editor.module';
import { MarxEditorModule } from 'marx-editor';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MarxEditorModule,
    AppRoutingModule,
    FormsModule,
    MeloMiniEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
