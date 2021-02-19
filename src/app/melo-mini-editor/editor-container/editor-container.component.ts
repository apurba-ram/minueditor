import {
  Component,
  OnInit,
  Input,
  OnChanges,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  AfterViewChecked,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EditorConfig, ToolbarConfig } from '../editor-config-interface';
import { nanoid } from 'nanoid';
import { NgZone } from '@angular/core';
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
export class EditorContainerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, AfterViewChecked {
  @Input() editorConfig: EditorConfig;
  multiple: boolean;
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

  toolbarConfig: ToolbarConfig;

  constructor(private zone: NgZone, private ref: ChangeDetectorRef) {

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
    this.resetToolbar();
  }

  resetToolbar(): void {
    this.toolbarConfig = {
      bold: false,
      italic: false,
      underline: false,
      strikeThrough: false,
      orderedList: false,
      unorderedList: false,
      superscript: false,
      subscript: false,
      quote: false
    };
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

  ngAfterViewChecked(): void {
   // console.log('Change detection triggered!');
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

  ngAfterViewInit(): void {
    document.addEventListener('selectionchange', this.selectionChange.bind(this), false);
  }

  ngOnDestroy(): void {
    document.removeEventListener('selectionchange', this.selectionChange.bind(this), false);
  }

  selectionChange(event: any): void {
    if (document.activeElement === document.getElementById(this.id)) {
      this.toolbarConfig = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        underline: document.queryCommandState('underline'),
        orderedList: document.queryCommandState('insertorderedList'),
        unorderedList: document.queryCommandState('insertunorderedList')
      };
    } else {
      this.resetToolbar();
    }
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
    if (this.oldRange) {
      this.sel.removeAllRanges();
      const range = this.oldRange.cloneRange();
      const t = document.createTextNode('');
      range.insertNode(t);
      range.setStartAfter(t);
      range.collapse();
      this.sel.addRange(range);
    } else {
      this.focus();
    }
    this.toolbarOperations(event?.id);
  }

  toolbarOperations(id: string): void {

    if (id) {
      if (!this.toolbarConfig[id]) {
        this.toolbarConfig[id] = true;
      } else {
        this.toolbarConfig[id] = false;
      }
    }
    switch (id) {
      case 'bold': document.execCommand('bold', false, '');
                   break;
      case 'italic':
        document.execCommand('italic', false, '');
        break;
      case 'strikeThrough':
        document.execCommand('strikeThrough', false, '');
        break;
      case 'underline':
        document.execCommand('underline', false, '');
        break;
      case 'orderedList':
        document.execCommand('insertOrderedList', false, '');
        break;
      case 'unorderedList':
        document.execCommand('insertunorderedList', false, '');
        break;
      case 'quote':
        this.insertBlockQuote();
        break;
      case 'link':
      case 'increase-indent':
        document.execCommand('indent', false, '');
        break;
      case 'decrease-indent':
        document.execCommand('outdent', false, '');
        break;
      case 'left-align':
        document.execCommand('justifyleft', false, '');
        break;
      case 'center-align':
        document.execCommand('justifycenter', false, '');
        break;
      case 'right-align':
        document.execCommand('justifyright', false, '');
        break;
      case 'fill-color':
      case 'text-color':
    }
  }

  insertBlockQuote(): void {
    const blockquote = document.createElement('blockquote');
    blockquote.setAttribute(
      'style',
      'box-sizing: border-box; padding-left:16px; padding-bottom: 10px; border-left: 2px solid rgb(223, 225, 230); margin: 1.143rem 5px 0px'
    );
    blockquote.innerHTML = '&#8204;';
    const div = document.createElement('div');
    div.appendChild(document.createElement('br'));
    const range = this.sel.getRangeAt(0);
    range.insertNode(div);
    range.insertNode(blockquote);
    range.setStart(blockquote, 0);
    range.setEnd(blockquote, 0);
    range.collapse();
  }

  insertSupTag(): void {
    const sup = document.createElement('sup');
    sup.innerHTML = '&#8204;';
    const range = this.sel.getRangeAt(0);
    range.insertNode(sup);
    range.setStart(sup, 1);
    range.setEnd(sup, 1);
    range.collapse();
  }

  insertSubTag(): void {
    const sub = document.createElement('sub');
    sub.innerHTML = '&#8204;';
    const range = this.sel.getRangeAt(0);
    range.insertNode(sub);
    range.setStart(sub, 1);
    range.setEnd(sub, 1);
    range.collapse();
  }

  //   insertSupTag(): void {
  //     const { startContainer } = this.sel.getRangeAt(0);
  //     if (this.checkValidOperation(startContainer)) {

  //       if (this.subTag) {
  //         this.reachTextNode('sub');
  //       }

  //       if (!this.supTag) {
  //         const sup = document.createElement('sup');
  //         sup.innerHTML = '&#8204;';
  //         const range =  this.sel.getRangeAt(0);
  //         range.insertNode(sup);
  //         range.setStart(sup, 1);
  //         range.setEnd(sup, 1);
  //         range.collapse();
  //         this.showEmoji = false;
  //       } else {
  //         this.reachTextNode('sup');
  //       }
  //     }
  //     this.focus();
  //   }
  //   insertSubTag(): void {
  //     const { startContainer } = this.sel.getRangeAt(0);
  //     if (this.checkValidOperation(startContainer)) {
  //       if (this.supTag) {
  //         this.reachTextNode('sup');
  //       }
  //       if (!this.subTag) {
  //         const sub = document.createElement('sub');
  //         sub.innerHTML = '&#8204;';
  //         const range =  this.sel.getRangeAt(0);
  //         range.insertNode(sub);
  //         range.setStart(sub, 1);
  //         range.setEnd(sub, 1);
  //         range.collapse();
  //         this.showEmoji = false;
  //       } else {
  //         this.reachTextNode('sub');
  //       }
  //     }
  //     this.focus();
  //   }
}
