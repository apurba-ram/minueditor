import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsContainerComponent } from './tools-container/tools-container.component';
import { ColorPaletteComponent } from './color-palette/color-palette.component';
import { FontListComponent } from './font-list/font-list.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToolsContainerComponent, ColorPaletteComponent, FontListComponent, ClickOutsideDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ToolsContainerComponent, ColorPaletteComponent, FontListComponent, ClickOutsideDirective
  ]
})
export class ToolsModule { }
