import { Component, OnInit, Input, OnChanges } from '@angular/core';
import EditorConfig from '../config-interface';
@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.less']
})
export class EditorContainerComponent implements OnInit, OnChanges {
  @Input() editorConfig: EditorConfig;
  constructor() {
    this.editorConfig = {
      file: false,
      mentionedNames: [],
      mentionedDates: [],
      colorPalette: ['#FF5630', '#000000', '#414141', '#36B37E',
                     '#6554C0', '#FF7A00', '#008299', ' #1E5DD3',
                     '#F0B819', '#00FFF7'],
      buttonName: '',
      fontColor: false,
      highlightColor: false
    };
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
