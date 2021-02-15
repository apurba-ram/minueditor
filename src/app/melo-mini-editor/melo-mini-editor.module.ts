import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorContainerComponent } from './editor-container/editor-container.component';
import { ToolsModule } from './tools/tools.module';
import { EditorMenuComponent } from './editor-menu/editor-menu.component';



@NgModule({
  declarations: [EditorContainerComponent, EditorMenuComponent],
  imports: [
    CommonModule,
    ToolsModule
  ],
  exports: [
    EditorContainerComponent
  ]
})
export class MeloMiniEditorModule { }
