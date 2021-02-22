import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
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
import { ConstantPool } from '@angular/compiler';
@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.less', '../theme.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorContainerComponent),
      multi: true,
    },
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorContainerComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy, AfterViewChecked {
  @Input() editorConfig: EditorConfig;
  // @Input() multiple: boolean;
  @Output() comment = new EventEmitter<string>();
  @Output() sendSavedFiles = new EventEmitter<any>();//coming from menu to container from container to ap
  imageToBeShown:any
  filesFromChild:any
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
  savedLinks:any=[]

  toolbarConfig: ToolbarConfig;

  fontColor: string;
  backgroundColor: string;

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

    this.fontColor = 'black';
    this.backgroundColor = 'white';

    this.toolbarPlacement = 'bottom';
    this.placeholder = '';
    this.id = nanoid();
    this.resetToolbar();
  }

 
  /**
  * @param event - Event which stores the files that are emitted from the file popup
  */
  saveFiles(event: any): void {
    // this.filesFromChild = $event;
    // console.log("files after saving in parent",this.filesFromChild)
    console.log(event);
    this.sendSavedFiles.emit(event);
  }

  /**
  * @param event - Event which stores the image emitted from the image popup
  */
  saveImage(event:any): void{
    const imgTag = document.createElement('img')
    imgTag.setAttribute('src', event.url);
    this.sel.removeAllRanges();
    const range = this.oldRange.cloneRange();
    range.insertNode(imgTag);
    range.setStartAfter(imgTag);
    range.collapse();
    this.sel.addRange(range);
  }

  /**
  * @param event - Event which stores the link emitted from the link popup
  */
  saveLink(event:any) : void{
    const anchorTag = document.createElement('a');
    anchorTag.innerHTML = event.linkText;
    anchorTag.setAttribute('href', event.linkUrl);
    anchorTag.setAttribute('title', event.linkTitle);
    anchorTag.setAttribute('target', '_blank');
    anchorTag.setAttribute('rel', 'noopener noreferrer');

    this.sel.removeAllRanges();
    const range = this.oldRange.cloneRange();
    range.insertNode(anchorTag);
    range.setStartAfter(anchorTag);
    range.collapse();
    this.sel.removeAllRanges();
    this.sel.addRange(range);
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
      quote: false,
      fontColor: this.fontColor,
      backgroundColor: this.backgroundColor,
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
    document.addEventListener(
      'selectionchange',
      this.selectionChange.bind(this),
      false
    );
    
  }
  immageResize() {
    const imageWidth = document.getElementById('contentimage').offsetWidth;
    const imageHeight = document.getElementById('contentimage').offsetWidth;
    console.log('Hi');
  }

  ngOnDestroy(): void {
    document.removeEventListener(
      'selectionchange',
      this.selectionChange.bind(this),
      false
    );
  }

  selectionChange(event: any): void {
    if (document.activeElement === document.getElementById(this.id)) {
      this.oldRange = this.sel.getRangeAt(0).cloneRange();
      this.setFontAndbackgroundColor();
      this.toolbarConfig = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        underline: document.queryCommandState('underline'),
        orderedList: document.queryCommandState('insertorderedList'),
        unorderedList: document.queryCommandState('insertunorderedList'),
        fontColor: this.fontColor,
        backgroundColor: this.backgroundColor,
        quote: this.checkParent(this.sel.anchorNode, 'blockquote'),
        superscript: this.checkParent(this.sel.anchorNode, 'sup'),
        subscript: this.checkParent(this.sel.anchorNode, 'sub')
      };
    } else {
      this.resetToolbar();
    }
  }

  setFontAndbackgroundColor(): void {
    if(this.sel?.baseNode) {
      const node = this.sel.baseNode;
      if(node?.parentNode?.nodeName === 'SPAN' && node?.parentNode?.attributes[0].name === 'style') {
        let styleAttrib = node?.parentNode?.attributes[0].nodeValue;
        const styleArray: string[] = styleAttrib.split(';');
        for(const style of styleArray) {
           if(style.indexOf('background-color:') > -1) {
            this.backgroundColor = style.substring(style.indexOf(':') + 1).trim();
          } else if(style.indexOf('color:') > -1) {
            this.fontColor = style.substring(style.indexOf(':') + 1).trim();
          } 
        }
      } else {
        this.fontColor = 'black';
        this.backgroundColor = 'white';
      }
    } else {
        this.fontColor = 'black';
        this.backgroundColor = 'white';
    }
  }

  checkParent(elem: any, tagName: string): boolean {
    if (elem) {
      if (elem?.nodeName === 'APP-TEXT-EDITOR') {
        return false;
      } else {
        if (elem.nodeName === tagName.toUpperCase()) {
          return true;
        } else {
          return this.checkParent(elem?.parentNode, tagName);
        }
      }
    } else {
      return false;
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
   
  /*
  * @param event - This parameter is an event that is occurred whenever we make changes inside the div contenteditable
  */
  setValue(event: any): void {
    event.stopPropagation();
    this.innerText = event.target.innerText;

    if (this.innerText === '') {
      document.execCommand('removeFormat', false, ''); // remove previous format once the editor is clear
      this.toolbarConfig.fontColor = 'black';
      this.toolbarConfig.backgroundColor = 'white';
      this.toolbarOperations('textColor', 'black');
      this.toolbarOperations('fillColor', 'white');
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

  /*
  * This function is called whenever the mention tab is closed
  */
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

  /*
  * @param event - This parameter is an event that is occurred whenever we paste things inside the div contenteditable
  */
  onPaste(event: any): void {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    let pastedHtml = clipboardData.getData('text/html');
    let pastedText = clipboardData.getData('text');
    const regexStyle = /style=".+?"/g; // matching all inline styles
    // const regexComment = /<!--.+?-->/g; // matching all inline styles
    if (pastedHtml === '' && pastedText !== '') {
      const rex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
      pastedText = pastedText.replace(rex, (match: any) => {
        return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
      });
      document.execCommand('insertHtml', false, pastedText);
    } else {
      // console.log('HERE', pastedHtml);
      pastedHtml = pastedHtml.replace(regexStyle, (match: any) =>  '');
      const rexa = /href=".*?"/g; // match all a href
      pastedHtml = pastedHtml.replace(rexa, (match: any) => {
        const str = ' target="_blank" rel="noopener noreferrer"';
        return match + str;
      });
      document.execCommand('insertHtml', false, pastedHtml);
    }
  }

  toolbarClicked(event: any): void {
    if (this.oldRange) {

      if(this.oldRange.collapsed) {
        this.sel.removeAllRanges();
        const range = this.oldRange.cloneRange();
        const t = document.createTextNode('');
        range.insertNode(t);
        range.setStartAfter(t);
        range.collapse();
        this.sel.addRange(range);
      }
      // if(event?.id !== 'textColor' && event?.id !== 'fillColor') {
      // } else {
      //   if(this.oldRange.collapsed) {
      //     this.sel.removeAllRanges();
      //     const range = this.oldRange.cloneRange();
      //     const t = document.createTextNode('');
      //     range.insertNode(t);
      //     range.setStartAfter(t);
      //     range.collapse();
      //     this.sel.addRange(range);
      //   }
      // }
    } else {
      this.focus();
    }
    this.toolbarOperations(event?.id, event?.value);
  }

  toolbarOperations(id: string, value: any): void {
    if (id && id !== 'fillColor' && id !== 'textColor' && id !== 'subscript' && id !== 'superscript' && id !== 'quote') {
      if (!this.toolbarConfig[id]) {
        this.toolbarConfig[id] = true;
      } else {
        this.toolbarConfig[id] = false;
      }
    }
    switch (id) {
      case 'h1': 
      case 'h2': 
      case 'h3': document.execCommand('formatBlock', false, id.toUpperCase());
                 break; 
      case 'para': document.execCommand('formatBlock', false, 'p');
                   break; 
      case 'superscript': this.insertSupTag();
                        break;
      case 'subscript': this.insertSubTag();
                        break;
      case 'bold':
        document.execCommand('bold', false, '');
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
      case 'increaseIndent':
        document.execCommand('indent', false, '');
        break;
      case 'decreaseIndent':
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
      case 'justify-full':
        document.execCommand('justifyfull', false, '');
        break;
      case 'fillColor':
        document.execCommand('styleWithCSS', false, '');
        document.execCommand('hiliteColor', false, value);
        this.sel.getRangeAt(0).collapse();
        break;
      case 'textColor':
        document.execCommand('styleWithCSS', false, '');
        document.execCommand('foreColor', false, value);
        this.sel.getRangeAt(0).collapse();
        break;
      case '@': this.insertTribute('@'); 
                break;
      case '#': this.insertTribute('#'); 
                break;
      case 'submit': this.commentAction();
                     break;
      case 'font-verdana': document.execCommand('fontName', false, 'verdana');
                           break;
      case 'font-arial': document.execCommand('fontName', false, 'arial');
                         break;
      case 'font-georgia': document.execCommand('fontName', false, 'georgia');
                           break;
      case 'font-impact': document.execCommand('fontName', false, 'impact');
                          break;
      case 'font-courier': document.execCommand('fontName', false, 'courier');
                           break;
      case 'font-tahoma': document.execCommand('fontName', false, 'tahoma');
                          break;
    }
  }

  insertBlockQuote(): void {
    if (!this.toolbarConfig.quote) {
      const blockquote = document.createElement('blockquote');
      blockquote.setAttribute('style', 'box-sizing: border-box; padding-left:16px; padding-bottom: 10px; border-left: 2px solid rgb(223, 225, 230); margin: 1.143rem 5px 0px');
      blockquote.innerHTML = '&#8204;';
      const div = document.createElement('div');
      div.appendChild(document.createElement('br'));
      const range =  this.sel.getRangeAt(0);
      range.insertNode(div);
      range.insertNode(blockquote);
      range.setStart(blockquote, 0);
      range.setEnd(blockquote, 0);
      range.collapse();
    } else {
      this.reachTextNode('blockquote');
    }
  }

  insertSupTag(): void {
    if(!this.toolbarConfig.superscript) {
      const sup = document.createElement('sup');
      sup.innerHTML = '&#8204;';
      const range = this.sel.getRangeAt(0);
      range.insertNode(sup);
      range.setStart(sup, 1);
      range.setEnd(sup, 1);
      range.collapse();
    } else {
      this.reachTextNode('sup');
    }
  }

  insertSubTag(): void {
    if(!this.toolbarConfig.subscript) {
      const sub = document.createElement('sub');
      sub.innerHTML = '&#8204;';
      const range = this.sel.getRangeAt(0);
      range.insertNode(sub);
      range.setStart(sub, 1);
      range.setEnd(sub, 1);
      range.collapse();
    } else {
      this.reachTextNode('sub');
    }
  }

  reachTextNode(tagName: string): void {
    const parent = this.getParent(this.sel.anchorNode, tagName);
    const space = document.createElement('text');
    space.innerHTML = '&#8204;';
    if (parent?.nextSibling) {
      this.sel.getRangeAt(0).setStartAfter(parent.nextSibling);
    } else {
      this.sel.getRangeAt(0).setStartAfter(parent);
    }
    this.sel.getRangeAt(0).insertNode(space);
    this.sel.getRangeAt(0).setStartAfter(space);
  }

  getParent(elem: any, tagName: string): any {
    if (elem) {
      if (elem?.nodeName === 'APP-TEXT-EDITOR') {
        return null;
      } else {
        if (elem.nodeName === tagName.toUpperCase()) {
          return elem;
        } else {
          return this.getParent(elem?.parentNode, tagName);
        }
      }
    } else {
      return null;
    }
  }

  /**
   *  Output event to export comment data and cleanup the editor
   */
  commentAction(): void {
    const event = document.getElementById(`${this.id}`).innerHTML;
    this.comment.emit(event);
    document.getElementById(`${this.id}`).innerHTML = '';
  }

  insertTribute(char: string): void {
    if (window.getSelection) {
      const code = char === '@' ? 'Digit2' : 'Digit3';
      const event = new KeyboardEvent('keydown', { key: `${char}`, code: `${code}` });
      document.getElementById(this.id).dispatchEvent(event);
      // if (this.oldRange) {
      //   this.sel.removeAllRanges();
      //   this.sel.addRange(this.oldRange);
      //   document.getElementById(this.id).dispatchEvent(event);
      //   const a = document.createTextNode(`${char}`);
      //   this.oldRange.insertNode(a);
      //   this.oldRange.setStartAfter(a);
      //   this.sel.removeAllRanges();
      //   this.sel.addRange(this.oldRange);
      //   // this.setValue(this.innerText, this.innerHtml);
      // } else {
      //   this.focus();
      //   this.oldRange = this.sel.getRangeAt(0).cloneRange();
      //   this.insertTribute(char);
      // }
    }
  }
}
