import { Directive ,Input,Output,EventEmitter,ComponentFactoryResolver, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
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
  selector: '[config]',
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

  constructor(
    private _element: ElementRef,
    private _componentResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) { }

  
  @Input() config:any ;
  @Output() myclose = new EventEmitter();
  @Output() myopen = new EventEmitter();

  keyHandler(e:any)
  {

    console.log("KEYCODE",e.keyCode)
   
    if(e.keyCode>=65 && e.keyCode<=90 || e.keyCode >= 97 && e.keyCode <= 122 || e.key==='ArrowDown' || e.key==='ArrowUp')
      {
        console.log("SEARCHING IF DIV EXISTS or scrolling by arrows")

          

      }
      else{
        console.log("DELETE MENTION LIST IF EXISTS")
        const mention_div =document.getElementById('mention-list-div');
        if(mention_div!==null)
        {
          mention_div.remove()
        }
      }

      console.log(e.key)
      console.log("HEY",this.config)
      for(let i=0;i<this.config.length;i++)
      {
        if(e.key===this.config[i].triggerChar)
        {
          const c=e.key;
          console.log("KEY FOUND",i,"ITEMS",this.config[i].items)
          this.mentionedItems=this.config[i].items;
          console.log("NEW MENTION LIST ITEM",this.mentionedItems)
          const mention_div=document.createElement('div');
          mention_div.setAttribute('id','mention-list-div');
          mention_div.style.height=100+'px';
          const ul=document.createElement('ul');
          for(let j=0;j<this.config[i].items.length;j++)
          {
              const li=document.createElement('li');
              li.innerHTML= this.mentionedItems[j].name;
              ul.appendChild(li)
          }
          mention_div.appendChild(ul)
          document.getElementsByClassName('editable-block')[0].appendChild(mention_div);
          }
      }


      

      if(e.key==='ArrowDown')
      {
        console.log("ARROW DOWN PRESSED")
      }


      if(e.key==='ArrowUp')
      {
        console.log("KEY UP PRESSED")
      }
      
   }
  
  blurHandler(e:any)
  {
    console.log("DIRETIVE BLUR",e)
  }
}
