import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorContainerComponent } from './editor-container/editor-container.component';
import { ToolsModule } from './tools/tools.module';



@NgModule({
  declarations: [EditorContainerComponent],
  imports: [
    CommonModule,
    ToolsModule
  ],
  exports: [
    EditorContainerComponent
  ]
})
export class MeloMiniEditorModule { }
