import {
  Component,
  OnInit,
  Input,
  OnChanges,
  forwardRef,
  ChangeDetectionStrategy,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  mentionConfig: any;
  mentionid: number | string;
  mentionedNames: { id: number; name: string }[];
  mentionedDates: string[];
  toolbarPlacement: 'top' | 'bottom';
  oldRange: any;

  constructor() {
    this.editorConfig = {
      file: false,
      mentionedNames: [],
      mentionedDates: [],
      colorPalette: [
        '#FF5630',
        '#000000',
        '#414141',
        '#36B37E',
        '#6554C0',
        '#FF7A00',
        '#008299',
        ' #1E5DD3',
        '#F0B819',
        '#00FFF7',
      ],
      buttonName: '',
      fontColor: false,
      highlightColor: false,
      placeholder: '',
      toolbarPlacement: 'top',
    };
    this.toolbarPlacement = 'bottom';
    this.placeholder = '';
    this.id = nanoid();
  }

  onChange: any = () => {};
  onTouch: any = () => {};

  set htmlVal(html) {
    if (html !== null && html !== undefined && this.html !== html) {
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
    this.sel = window.getSelection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editorConfig && this.editorConfig) {
      this.placeholder = this.editorConfig?.placeholder ?? '';

      this.mentionConfig = {};
      if (
        Array.isArray(this.editorConfig?.mentionedNames) &&
        this.editorConfig?.mentionedNames.length > 0
      ) {
        this.editorConfig.mentionedNames = this.editorConfig?.mentionedNames.filter(
          (item: { id: number; name: string }) => {
            if (item.id !== 0 && item.name.trim() !== '') {
              return item;
            }
          }
        );

        this.mentionConfig.mentions = [];
        this.mentionConfig.mentions.push({
          items: this.editorConfig.mentionedNames,
          triggerChar: '@',
          mentionSelect: (item) => {
            this.tribute = `@${item.name}`;
            this.mentionid = item.id;
            return this.tribute;
          },
          labelKey: 'name',
          maxItems: 20,
          disableSearch: false,
          dropUp: true,
        });
      }
      if (
        Array.isArray(this.editorConfig?.mentionedDates) &&
        this.editorConfig?.mentionedDates.length > 0
      ) {
        this.editorConfig.mentionedDates = [
          ...new Set(this.editorConfig?.mentionedDates),
        ];
        this.mentionConfig.mentions.push({
          items: this.editorConfig.mentionedDates,
          triggerChar: '#',
          mentionSelect: (item) => {
            this.tribute = `#${item.date}`;
            this.mentionid = item.date;
            return this.tribute;
          },
          labelKey: 'date',
          maxItems: 20,
          disableSearch: false,
          dropUp: true,
        });
      }
    }
  }

  getPrecedingCharacter(container: any): string {
    if (this.sel) {
      const r = this.sel.getRangeAt(0).cloneRange();
      r.setStart(container, 0);
      return r.toString().slice(-1);
    }
    return '';
  }

  checkValidOperation(elem: any): boolean {
    if (elem) {
      if (elem === document.getElementById(this.id)) {
        return true;
      } else {
        return this.checkValidOperation(elem?.parentNode);
      }
    } else {
      return false;
    }
  }

  blur(): void {
    this.oldRange = this.sel.getRangeAt(0).cloneRange(); // to store the range when element is blurred
    // this.bold = false;
    // this.italic =  false;
    // this.orderedList = false;
    // this.unorderedList = false;
    // this.underline = false;
    // this.strikeThrough = false;
  }

  focus(): void {
    if (document.getElementById(`${this.id}`)) {
        document.getElementById(`${this.id}`).focus();
    }
  }

  setValue(event: any): void {
    event.stopPropagation();
    this.innerText = event.target.innerText;

    if (this.innerText === '') {
      document.execCommand('removeFormat', false, ''); // remove previous format once the editor is clear
    }
    this.lastChar = this.getPrecedingCharacter(
      window.getSelection().anchorNode
    ); // gets the last input character

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

  mentionClosed(): void {
    // insert mentions

    if (this.tribute !== '') {
      const input = document.createElement('input');
      input.setAttribute('value', `${this.tribute}`);
      input.setAttribute('type', 'button');
      input.setAttribute('disabled', 'true');
      input.setAttribute('data-id', `${this.mentionid}`);
      input.setAttribute('mention-data', `${this.flag === 0 ? '@' : '#'}`);
      input.style.border = 'none';
      input.style.borderRadius = '2px';
      input.style.padding = '3px';
      input.style.backgroundColor = '#e7eff6';
      input.style.color = '#4681ef';
      input.style.fontWeight = 'inherit';
      input.style.fontSize = 'inherit';
      console.log(this.oldRange);
      const range = this.sel.getRangeAt(0).cloneRange();
      this.sel.removeAllRanges();
      const sp = document.createTextNode(' ');
      range.insertNode(input);
      range.insertNode(sp);
      range.setStartAfter(input);
      this.sel.addRange(range);
      this.tribute = '';
    }
    //  this.valueInput = true;
  }
  onPaste(event: any): void {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    let pastedHtml = clipboardData.getData('text/html');
    let pastedText = clipboardData.getData('text');
    const regIn = /style=".+?"/g; // matching all inline styles
    if (pastedHtml === '' && pastedText !== '') {
      const rex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      pastedText = pastedText.replace(rex, (match: any) => {
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
      });
      document.execCommand('insertHtml', false, pastedText);
    } else {
      pastedHtml = pastedHtml.replace(regIn, (match: any) => '');
      // const rexa = /<a href=".*?">.+?<\/a>/g; // match all a href
      const rexa = /href=".*?"/g; // match all a href
      pastedHtml = pastedHtml.replace(rexa, (match: any) => {
        console.log(match);
        const str = ' target="_blank" rel="noopener noreferrer"';
        // return (
        //   match.substring(0, match.indexOf('>')) +
        //   str +
        //   match.slice(match.indexOf('>'))
        // );
        return match + str;
      });
      document.execCommand('insertHtml', false, pastedHtml);
    }
  }

  toolbarClicked(event: any): void {
        if (!this.sel || !this.sel.anchorNode) {
            this.focus();
        }
        switch (event.id) {
            case 'bold': this.insertBold();
                         break;
            case 'italic': this.insertItalic();
                           break;
            case 'line-through': this.insertItalic();
                                 break;
            case 'underline': this.insertUnderLine();
                              break;
            case 'unordered-list': this.insertUnorderedList();
                                   break;
            case 'ordered-list': this.insertOrderedList();
                                 break;
            case 'quote':
            case 'link':
            case 'left-align':
            case 'center-align':
            case 'right-align':
            case 'fill-color':
            case 'text-color':
        }
  }

  insertBold(): void {
    const { startContainer } = this.sel.getRangeAt(0);
    if (this.checkValidOperation(startContainer)) {
      document.execCommand('bold', false, '');
      // this.bold = !this.bold;
      this.focus();
    } else {
      this.focus();
    }
  }

  insertItalic(): void {
    const { startContainer } = this.sel.getRangeAt(0);
    if (this.checkValidOperation(startContainer)) {
      document.execCommand('italic', false, '');
       // this.italic = !this.italic;
      this.focus();
    } else {
      this.focus();
    }
  }

  insertLineThrough(): void {
    const { startContainer } = this.sel.getRangeAt(0);
    if (this.checkValidOperation(startContainer)) {
      document.execCommand('strikeThrough', false, '');
      // this.strikeThrough = !this.strikeThrough;
      this.focus();
    } else {
      this.focus();
    }
  }

  insertUnderLine(): void {
    const { startContainer } = this.sel.getRangeAt(0);
    if (this.checkValidOperation(startContainer)) {
      document.execCommand('underline', false, '');
      // this.underline = !this.underline;
      this.focus();
    } else {
      this.focus();
    }
  }

  insertOrderedList(): void {
    const { startContainer } = this.sel.getRangeAt(0);
    if (this.checkValidOperation(startContainer)) {
      document.execCommand('insertOrderedList', false, '');
      // this.orderedList = !this.orderedList;
      this.focus();
    } else {
      this.focus();
    }
  }

  insertUnorderedList(): void {
    const { startContainer } = this.sel.getRangeAt(0);
    if (this.checkValidOperation(startContainer)) {
      document.execCommand('insertunorderedList', false, '');
      // this.unorderedList = !this.unorderedList;
      this.focus();
    } else {
      this.focus();
    }
  }
}
