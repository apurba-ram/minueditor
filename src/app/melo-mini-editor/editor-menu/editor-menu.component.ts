import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditorConfig from '../config-interface';
@Component({
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
  styleUrls: ['./editor-menu.component.less']
})
export class EditorMenuComponent implements OnInit {

  @Input() editorConfig: EditorConfig;
  @Output() buttonClick: EventEmitter<string> = new EventEmitter();
  enter = false;
  upload= false;
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

  buttonClicked(event: string) {
    this.buttonClick.emit(event);
  }

  attachPopover() {
    this.upload = !this.upload;
  }
  dragenter(e) {
    this.enter = true;
  }
  dragend(e) {
    this.enter = false;
  }
  dragleave(e) {
    this.enter = false;
  }
}
