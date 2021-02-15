import { Component, OnInit, Input, OnChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import EditorConfig from '../config-interface';
@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorContainerComponent),
      multi: true
    }
  ]
})
export class EditorContainerComponent implements OnInit, OnChanges {
  @Input() editorConfig: EditorConfig;

  html: string;
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

  onChange: any = () => {};
  onTouch: any = () => {};

  set htmlVal(html) {
      if ( html !== null && html !== undefined && this.html !== html) {
        this.html = html;
        this.onChange(html);
        this.onTouch(html);
      }
  }

  writeValue(value: any): void {
    this.htmlVal = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  hello(): void {
    console.log('HELLO');
  }

}
