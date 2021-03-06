import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorContainerComponent } from './editor-container/editor-container.component';
import { ToolsModule } from './tools/tools.module';
import { EditorMenuComponent } from './editor-menu/editor-menu.component';
import { MentionModule } from 'angular-mentions';
import { FormsModule } from '@angular/forms';
import { EmojiComponent } from './emoji/emoji.component';
import { EmojiPipe } from './emoji/emoji.pipe';


@NgModule({
  declarations: [EditorContainerComponent, EditorMenuComponent, EmojiComponent, EmojiPipe],
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
