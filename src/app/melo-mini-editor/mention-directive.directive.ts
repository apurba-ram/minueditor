import { Directive ,Input,Output,EventEmitter,ComponentFactoryResolver, ElementRef, TemplateRef, ViewContainerRef} from '@angular/core';
import {  EditorConfig } from './editor-config-interface';



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
  nodes:any;
  selcted:number=0;
  activeItem:any;
  searchingString:string=' ';
  character:any;
  sel:any;
  r:any;
  r2:any;
  rect:any;
  node:any;
  offset:any;
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

    // console.log("KEYCODE",e.keyCode)
   
    if( e.key==='ArrowDown' || e.key==='ArrowUp' || e.key==='Enter' || e.key==='Backspace')
      {
        // console.log("SEARCHING IF DIV EXISTS or scrolling by arrows")
        if(e.keyCode===8)
        {
          // console.log("LNGHT",this.searchString.length);
          if(this.searchString?.length>0)
          {
            this.searchString=this.searchString.substr(0,this.searchString.length-1);
            // console.log("SEARCHING backspace ",this.searchString)
          }
          else
          {
          const mention_div =document.getElementById('mention-list-div');
          if(mention_div!==null)
          {
            mention_div.remove();
          }
          }
        }  
       else  if(e.key==='Enter')
        { 
          // console.log("ACTIVE ITEM",this.activeItem)
          // console.log("ENTEREEE")
          this.searchString=''
          const mention_div =document.getElementById('mention-list-div');
        if(mention_div!==null)
        {
          // console.log("MENTION DIV NOT NULL")
          this.selcted=0;
          this.myopen.emit({
            char:this.character,
            data:this.activeItem
          });
          // console.log("ACTIVE ITEM",this.activeItem)
          if(this.activeItem!==undefined)
          {
            // console.log("ACTIVE ITME")
            e.preventDefault();
            mention_div.remove()
          }
          else{
            // console.log("ELSE")
            mention_div.remove()
          }  
        }
        }
      }
      else{
        // console.log("ELSSSEEEEEE AFTER ENTER")
       
         if(e.keyCode>=65 && e.keyCode<=90 || e.keyCode >= 97 && e.keyCode <= 122 )
        {
        // console.log("Searchinstring SAGAR",this.searchString)
        const mention_div1 =document.getElementById('mention-list-div');
        if(mention_div1!==null)
        {

          this.searchString+=e.key;
          // console.log(this.searchString.slice(9))
          let ss=' '
          if(this.searchString.includes('undefined'))
          {
             ss=this.searchString.slice(9)
          }
          else{
             ss=this.searchString;
          }
          // console.log("SEARCHING STRING",this.searchString);
          // console.log("LIST",this.mentionedItems);
          const matches = this.mentionedItems.filter(s => s.name.includes(ss));
          // console.log("FILTERED ",matches);
          mention_div1.remove();
          if(matches.length>0)
          {
            const sel = document.getSelection()
            const r = sel.getRangeAt(0)
            let rect
            let r2
            // supposed to be textNode in most cases
            // but div[contenteditable] when empty
            const node = r.startContainer
            const offset = r.startOffset
            if (offset > 0) {
              // new range, don't influence DOM state
              r2 = document.createRange()
              r2.setStart(node, (offset - 1))
              r2.setEnd(node, offset)
              // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
              // IE9, Safari?(but look good in Safari 8)
              rect = r2.getBoundingClientRect()
              // return { left: rect.right, top: rect.top }
              // console.log("LEFT",rect.right,"TOPE",rect.top);
            } 
          
          const mention_div2=document.createElement('div');
          mention_div2.style.boxShadow="10px 20px 30px gray";
          mention_div2.style.background='white';
          mention_div2.setAttribute('id','mention-list-div');
          mention_div2.style.height=100+'px';
          mention_div2.style.width=200+'px';
          mention_div2.style.position='absolute';
          setTimeout(() => {
            mention_div2.style.left=rect.left+'px';
            mention_div2.style.top=rect.top+25+'px';
          }, 10);
          mention_div2.style.overflow='auto';
          mention_div2.contentEditable='false';
          const ul=document.createElement('ul');
          for(let i=0;i<matches.length;i++)
          {
            const li=document.createElement('li');
              li.innerHTML= matches[i].name;
              li.setAttribute('class',`mention-item`);
              li.style.listStyle='none';
              li.style.padding="10px 10px 10px ";
              ul.appendChild(li)    
          }
          mention_div2.appendChild(ul)
          document.body.appendChild(mention_div2);
          this.activeItem=matches[0];
          if(document.getElementsByClassName('mention-item')[0]!==null)
          {
            const v=document.getElementsByClassName('mention-item')[0] as HTMLElement;
            if(v)
            {
              v.style.background='#4682B4';
            }
           
            // this.activeItem=this.mentionedItems[0];
            // console.log("ACTIVE ITEM",this.activeItem);
          }
        }
        }
        }
        else{
          const mention_div =document.getElementById('mention-list-div');
          if(mention_div!==null)
          {
            mention_div.remove();
          }
        }
      }

      // console.log(e.key)
      // console.log("HEY",this.config)
      for(let i=0;i<this.config.length;i++)
      {
        if(e.key===this.config[i].triggerChar)
        {
          this.character=e.key;
          const c=e.key;
          // console.log("KEY FOUND",i,"ITEMS",this.config[i].items)
          this.mentionedItems=this.config[i].items;
          // console.log("NEW MENTION LIST ITEM",this.mentionedItems)
           const sel = document.getSelection()
            const r = sel.getRangeAt(0)
            let rect
            let r2
            // supposed to be textNode in most cases
            // but div[contenteditable] when empty
            const node = r.startContainer
            let offset = r.startOffset
            // console.log("RRRR",r.startOffset)
            if(offset===0)
            {
              offset=1;
              // let markerTextChar = '\ufeff';
              const span=document.createElement('span');
              span.normalize;
              r.insertNode(span);
            }
            if (offset >0) {
              // console.log("OFFSET",offset)
              r2 = document.createRange()
              r2.setStart(node, (offset -1))
              r2.setEnd(node, offset)
              rect = r2.getBoundingClientRect()
              // console.log("LEFT",rect.right,"TOP",rect.top);
            } 
            else{


            }
          const mention_div=document.createElement('div');
          mention_div.setAttribute('id','mention-list-div');
          mention_div.style.boxShadow="10px 20px 30px gray";
          mention_div.style.background='white';
          mention_div.style.position='absolute';
          if(rect!==undefined && r2!==undefined)
          {
            // console.log("MENTION DIVV LEFT TTTR",rect,r2)
            mention_div.style.left=rect.left+'px';
            mention_div.style.top=rect.top+25+'px';
          }
          // else{
          //   mention_div.style.left=24+'px';
          //   mention_div.style.top=120+'px'; 
          // }
              // setTimeout(() => {
              //   mention_div.style.left=rect.left+'px';
              //   mention_div.style.top=rect.top+'px';
              // }, 10);
          mention_div.style.height=300+'px';
          mention_div.style.width=200+'px';
          mention_div.style.overflow='auto';
          mention_div.style.zIndex = "999";
          // mention_div.style.boxShadow='20 px solid black';
          mention_div.contentEditable='false';
          // mention_div.style.background="#87CEFA"
          const ul=document.createElement('ul');
          ul.setAttribute('id','mention-ul')
          for(let j=0;j<this.config[i].items.length;j++)
          {
              const li=document.createElement('li');
              li.innerHTML= this.mentionedItems[j].name;
              li.setAttribute('class',`mention-item`);
              li.setAttribute('tabIndex','-1');
              li.style.listStyle='none';
              li.style.padding="10px 10px 10px ";
              ul.appendChild(li)    
          }
          mention_div.appendChild(ul)
          document.body.appendChild(mention_div);
          if(document.getElementsByClassName('mention-item')[0]!==null)
          {
            const v=document.getElementsByClassName('mention-item')[0] as HTMLElement;
            v.style.background='#4682B4';
            this.activeItem=this.mentionedItems[0];
            // console.log("ACTIVE ITEM",this.activeItem);
          }
          }
      }


      if(e.key==='ArrowDown')
      {
        
        e.preventDefault();
        
        // console.log("ARROW DOWN PRESSED")
        const lis=document.getElementsByClassName('mention-item');
        if(lis.length>0)
        {
            if(this.selcted<lis.length-1)
            {
              
              this.nodes=lis;
              // console.log("TYPE",typeof(this.nodes),this.nodes);
              // console.log("SELECTED",this.selcted)
              const newactive=document.getElementsByClassName('mention-item')[this.selcted+1] as HTMLElement;
              document.getElementsByClassName('mention-item')[this.selcted+1].scrollIntoView(false)
              newactive.style.background='#4682B4';
              // console.log("NEW ACTIVE",newactive);
              const oldactive=document.getElementsByClassName('mention-item')[this.selcted] as HTMLElement;
              oldactive.style.background='white';
              // console.log("OLD ACTIVE",oldactive)
              this.activeItem=this.mentionedItems[this.selcted+1];
              this.selcted=this.selcted+1;
              
            }
        }
      }


      if(e.key==='ArrowUp')
      {
        e.preventDefault();
        if (this.selcted === -1) return;
        // console.log("ARROW UP PRESSED")
        const lis=document.getElementsByClassName('mention-item');
        if(lis.length>0)
        {
          // console.log("ALL LIS",lis)
          this.nodes=lis;
          // console.log("TYPE",typeof(this.nodes),this.nodes);
          // console.log("SELECTED",this.selcted)
          if(this.selcted!=0)
          {
            console.log("move up ");
            const newactive=document.getElementsByClassName('mention-item')[this.selcted-1] as HTMLElement;
            document.getElementsByClassName('mention-item')[this.selcted-1].scrollIntoView(false);
            newactive.style.background='#4682B4';
            // console.log("NEW ACTIVE",newactive);
            const oldactive=document.getElementsByClassName('mention-item')[this.selcted] as HTMLElement;
            oldactive.style.background='white';
            // console.log("OLD ACTIVE",oldactive);
            this.activeItem=this.mentionedItems[this.selcted-1];
            this.selcted=this.selcted-1;
          }
         
        }
      }
      
   }
  
  blurHandler(e:any)
  {
    // console.log("DIRETIVE BLUR",e)
    if( document.getElementById('mention-list-div')!==null)
    {
      document.getElementById('mention-list-div').remove();
    }
  }
}
