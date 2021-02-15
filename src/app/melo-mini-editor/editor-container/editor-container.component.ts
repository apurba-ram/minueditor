import { Component, OnInit, Input, OnChanges, forwardRef, ChangeDetectionStrategy, SimpleChange, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import EditorConfig from '../config-interface';
import { nanoid } from 'nanoid';
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorContainerComponent implements OnInit, OnChanges {
  @Input() editorConfig: EditorConfig;

  html: string;
  innerText: string;
  lastChar: string;
  sel: any;
  startOffset: number;
  endOffset: number;
  id: string;
  format: boolean;
  node: any;
  tribute: string;
  flag: number;
  placeholder: string;
  toolbarPlacement: 'top' | 'bottom';

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
      highlightColor: false,
      placeholder: '',
      toolbarPlacement: 'top'
    };
    this.toolbarPlacement = 'bottom';
    this.placeholder = '';
    this.id = nanoid();
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editorConfig && this.editorConfig) {
        this.placeholder = this.editorConfig?.placeholder ?? '';
    }
  }

  hello(): void {
    console.log('HELLO2');
  }

  getPrecedingCharacter(container: any): string { // get last input character
    const r = this.sel.getRangeAt(0).cloneRange();
    r.setStart(container, 0);
    return r.toString().slice(-1);
  }

  blur(): void {
  }

  setValue(innerText: string, innerHtml: string): void {

    this.innerText = innerText;

    if (this.innerText === '') {
      document.execCommand('removeFormat', false, ''); // remove previous format once the editor is clear
    }
    this.lastChar = this.getPrecedingCharacter(window.getSelection().anchorNode); // gets the last input character

    if (this.format && this.startOffset && this.tribute) {
      this.format = false;
      this.endOffset = this.sel.getRangeAt(0).endOffset;

      const range = document.createRange();
      range.setStart(this.node, this.startOffset - 1);
      range.setEnd(this.node, this.endOffset);
      range.deleteContents(); // deleting previous set contents
    }

    if (this.lastChar === '@' || this.lastChar === '#') {
      this.node = this.sel.anchorNode;
      this.format = true;
      this.flag = this.lastChar === '@' ? 0 : 1;
      this.startOffset = this.sel.getRangeAt(0).startOffset;
    }

    this.writeValue(document.getElementById(`${this.id}`).innerHTML);
  }

}
