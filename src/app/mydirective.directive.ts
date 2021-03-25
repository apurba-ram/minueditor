import { Directive ,Input,Output,EventEmitter} from '@angular/core';
import {  EditorConfig,MyMentionConfig } from './melo-mini-editor/editor-config-interface';

@Directive({
  selector: '[appMydirective]',
  host: {
    '(keydown)': 'keyHandler($event)',
    // '(input)': 'inputHandler($event)',
    '(blur)': 'blurHandler($event)',
    'autocomplete': 'off'
  }
})
export class MydirectiveDirective {

  mentionedItems:any=[]
  constructor() { }
  @Input() editorConfig: EditorConfig ;
  @Output() myclose = new EventEmitter();
  @Output() myopen = new EventEmitter();

  keyHandler(e:any)
  {
      console.log(e.key)
      // console.log("HEY",this.editorConfig.mentions)
      for(let i=0;i<this.editorConfig.mentions.length;i++)
      {
        if(e.key===this.editorConfig.mentions[i].triggerChar)
        {
          console.log("KEY FOUND",i,"ITEMS",this.editorConfig.mentions[i].items)
          this.myopen.emit(this.editorConfig.mentions[i].items)
          // this.mymentionconfig.disableStyle=true
        }
      }
  }

  blurHandler(e:any)
  {
    console.log("DIRETIVE BLUR",e)
  }

}
