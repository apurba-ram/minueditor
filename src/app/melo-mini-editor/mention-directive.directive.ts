import { Directive ,Input,Output,EventEmitter} from '@angular/core';
import {  EditorConfig,MyMentionConfig } from './editor-config-interface';



const KEY_BACKSPACE = 8;
const KEY_TAB = 9;
const KEY_ENTER = 13;
const KEY_SHIFT = 16;
const KEY_ESCAPE = 27;
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_BUFFERED = 229;

@Directive({
  selector: '[appMentionDirective],[config]',
  host: {
    '(keydown)': 'keyHandler($event)',
    // '(input)': 'inputHandler($event)',
    '(blur)': 'blurHandler($event)',
    'autocomplete': 'off'
  }
})
export class MentionDirectiveDirective {
  mentionedItems:any=[]
  private searchString: string;
  // private searchList: MentionListComponent;
  private searching: boolean;
  private lastKeyCode: number;

  constructor() { }
  @Input() config:any ;
  @Output() myclose = new EventEmitter();
  @Output() myopen = new EventEmitter();

  keyHandler(e:any)
  {
      // console.log(e.key)
      // console.log("HEY",this.config)
      for(let i=0;i<this.config.length;i++)
      {
        if(e.key===this.config[i].triggerChar)
        {
          const c=e.key;
          console.log("KEY FOUND",i,"ITEMS",this.config[i].items)
          const div1=document.getElementById('mention-div')
          // console.log("LENGHTH",this.config[i].items)
          if(this.config[i].items.length>0)
          {
            console.log("HEY 1")
            document.getElementById('mentiion-item-list').innerHTML=' '
            // div1.innerHTML=this.config[i].items;
            for(let j=0;j<this.config[i].items.length-1;j++)
            {
              console.log("HELLO ",j)
              const li=document.createElement('li')
              li.setAttribute('id',`${this.config[i].items[j].id}`)
              li.innerHTML=this.config[i].items[j].name;
              document.getElementById('mentiion-item-list').appendChild(li)
              li.addEventListener('click',(e:any)=>
              {
                console.log("IDDDDD",e.target.id)
                this.myopen.emit(
                  {
                    char:c,
                    id:this.config[i].items[j].id,
                    name:this.config[i].items[j].name
                  }
                ) 
                
              })
              // document.getElementById('mentiion-item-list').innerHTML+=`<li id='itemli'${j}>`+this.config[i].items[j]+`</li>`
            }
          }
         
        }
        else{
          // document.getElementById('mention-div').innerHTML=' '
        }
      }
  }

  blurHandler(e:any)
  {
    console.log("DIRETIVE BLUR",e)
  }
}
