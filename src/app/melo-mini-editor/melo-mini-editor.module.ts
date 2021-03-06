import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorContainerComponent } from './editor-container/editor-container.component';
import { ToolsModule } from './tools/tools.module';
import { EditorMenuComponent, EditorFilesComponent, EditorLinkComponent } from './editor-menu/editor-menu.component';
import { MentionModule } from 'angular-mentions';
import { FormsModule } from '@angular/forms';
import { MarxModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [EditorContainerComponent, EditorMenuComponent, MarxModalComponent, EditorFilesComponent, EditorLinkComponent],
  imports: [
    CommonModule,
    ToolsModule,
    MentionModule,
    FormsModule
  ],
  exports: [
    EditorContainerComponent,
    EditorMenuComponent
  ]
})
export class MeloMiniEditorModule { }
