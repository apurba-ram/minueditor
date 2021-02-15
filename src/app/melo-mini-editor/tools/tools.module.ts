import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsContainerComponent } from './tools-container/tools-container.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { FontListComponent } from './font-list/font-list.component';



@NgModule({
  declarations: [ToolsContainerComponent, ColorPaletteComponent, FontListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ToolsContainerComponent, ColorPaletteComponent, FontListComponent
  ]
})
export class ToolsModule { }
