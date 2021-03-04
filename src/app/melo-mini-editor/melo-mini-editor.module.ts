import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorContainerComponent } from './editor-container/editor-container.component';
import { ToolsModule } from './tools/tools.module';
import { EditorMenuComponent } from './editor-menu/editor-menu.component';
import { MentionModule } from 'angular-mentions';
import { FormsModule } from '@angular/forms';
import { EmojiComponent } from './emoji/emoji.component';


@NgModule({
  declarations: [EditorContainerComponent, EditorMenuComponent, EmojiComponent],
  imports: [
    CommonModule,
    ToolsModule,
    MentionModule,
    FormsModule,
    
  ],
  exports: [
    EditorContainerComponent,
    EditorMenuComponent
  ]
})
export class MeloMiniEditorModule { }
