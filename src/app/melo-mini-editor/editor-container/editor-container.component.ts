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
import { build$ } from 'protractor/built/element';
import { Button } from 'protractor';
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
  showResizeDiv:boolean=false
  toolbarConfig: ToolbarConfig;
  fontColor: string;
  backgroundColor: string;
  ResizableNumber:number=0
  ResizeClicked:boolean=false
  PrevIousImage:number
  clicked = false;
  focused:boolean=false
  blured:boolean=true
  dragEvent:boolean=false
  mousOver:boolean=false
  countMouseUp:number=0
  imageEventeId:any
  shouldAlign:boolean=false
   original_width:any = 0;
   original_height:any = 0;
   original_x:any = 0;
   original_y:any = 0;
   original_mouse_x:any = 0;
   original_mouse_y:any = 0;
   minimum_size:any=0
   imageContainerId:any
 

  constructor(private zone: NgZone, private ref: ChangeDetectorRef) {
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
    this.editorConfig.buttonName = 'Upload';
    this.sendSavedFiles.emit(event);
  }


  
  
  

  saveLinkndShowInEditor($event:any)
  {
    console.log("event",$event)
    const obj={
              linkUrl:$event.linkUrl,
              linkTitle:$event.linkTitle,
              linkText:$event.linkText
         }
          this.savedLinks.push(obj)
        console.log("Links in container",this.savedLinks[this.savedLinks.length-1])
        const anchonrTag=document.createElement('a')
        anchonrTag.innerHTML=this.savedLinks[this.savedLinks.length-1].linkText
        anchonrTag.setAttribute('href',this.savedLinks[this.savedLinks.length-1].linkUrl)
        anchonrTag.setAttribute('title',this.savedLinks[this.savedLinks.length-1].linkTitle)
        console.log("anchor tag",anchonrTag)
        document.getElementsByClassName('editable-block')[0].appendChild(anchonrTag)
  }
  /**
  * @param event - Event which stores the image emitted from the image popup
  */
  saveImage(event:any): void{

    //generate random ids for images
    const id = (() => {
      return '_' + Math.random().toString(36).substr(2, 9);
    })();

    const len=document.getElementsByClassName('editor-image').length
    if(len>0)
    {

      console.log("PREVIOUS CONTAINER",document.getElementsByClassName('editor-image')[len-1].getBoundingClientRect().bottom,
      document.getElementsByClassName('editor-image')[len-1].getBoundingClientRect().left)
    }


    //create image container and img 
    const imageContainer=document.createElement('div')
    imageContainer.setAttribute('id','image-container'+id)
    imageContainer.setAttribute('class','image-container')
    imageContainer.setAttribute('contenteditable','true')
    if(len>0)
    {
        imageContainer.style.clear='both'
        imageContainer.style.textAlign='center'

    }
    
    const imgTag=document.createElement('img')
    imgTag.setAttribute('id','image'+id)
    imgTag.setAttribute('class','editor-image')
    imgTag.setAttribute('src',event.url)
    imgTag.setAttribute('contenteditable','false')
    imgTag.setAttribute('tabindex','0')
    imgTag.style.width = 300+'px';

    //create br tag to append 
    const br=document.createElement('br')

    imageContainer.appendChild(imgTag)
    document.getElementsByClassName('editable-block')[0].appendChild(br)

  
    //image focus

    imgTag.addEventListener('focus',this.imgFoucs.bind(this));


    //image blur
    imgTag.addEventListener('blur',this.imgBlur.bind(this))    

    const seprator=document.createElement('div')
    seprator.style.clear='both'
    this.sel.removeAllRanges();
    const range = this.oldRange.cloneRange();
    range.insertNode(imageContainer);
    range.setStartAfter(imageContainer);
    range.insertNode(seprator);
    range.setStartAfter(seprator);
    range.collapse();
    this.sel.addRange(range);
    

  }

  imgFoucs(event:any)
  {
    //delete image using delete button from keyboard

    event.target.addEventListener('keydown',(e)=>{
      
      if(e.keyCode===46){
        // console.log("DELETE IMAGE")
        document.getElementById(event.target.parentNode.id).remove()
      }
    })

    

    // console.log("IMAGE HEIGHT",document.get)
    console.log("FOCUS",event.target.id)

    //create resizer div
    const resizerContainer=document.getElementById('resize-container')
    if(resizerContainer===null)
    {
      const resizer=document.createElement('div')
      resizer.setAttribute('class','resize-container active')
      resizer.setAttribute('id','resize-container')
      resizer.style.width=document.getElementById(event.target.id).clientWidth+'px'
      resizer.style.height=document.getElementById(event.target.id).clientHeight+'px'
      resizer.style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
  
      const topLeft=document.createElement('div')
      topLeft.setAttribute('class','resize-pointer top-left active')
      topLeft.setAttribute('id','top-left')
  
  
      const topRight=document.createElement('div')
      topRight.setAttribute('class','resize-pointer top-right active')
      topRight.setAttribute('id','top-right')
  
      const bottomLeft=document.createElement('div')
      bottomLeft.setAttribute('class','resize-pointer bottom-left active')
      bottomLeft.setAttribute('id','bottom-left')
  
  
      const bottomRight=document.createElement('div')
      bottomRight.setAttribute('class','resize-pointer bottom-right active')
      bottomRight.setAttribute('id','bottom-right')
  
      resizer.appendChild(topLeft)
      resizer.appendChild(topRight)
      resizer.appendChild(bottomLeft)
      resizer.appendChild(bottomRight)
  
      document.getElementById(event.target.parentNode.id).appendChild(resizer)

      //resiable algorithm

      const minimum_size = 20;
      let original_width = 0;
      let original_height = 0;
      let original_x = 0;
      let original_y = 0;
      let original_mouse_x = 0;
      let original_mouse_y = 0;
      let resizer_width=0;
      let resizer_height=0;
      let resizer_x=0;
      let resizer_y=0;
      
      //get Original widht and height
      function getOriginal(e,imgId)
      {
        console.log("IMAGE ID",imgId)
        original_width = parseFloat(getComputedStyle(document.getElementById(imgId), null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(document.getElementById(imgId), null).getPropertyValue('height').replace('px', ''));
        resizer_width= parseFloat(getComputedStyle(document.getElementById('resize-container'), null).getPropertyValue('width').replace('px', ''));
        resizer_height= parseFloat(getComputedStyle(document.getElementById('resize-container'), null).getPropertyValue('height').replace('px', ''));
        original_x = document.getElementById(imgId).getBoundingClientRect().left;
        original_y = document.getElementById(imgId).getBoundingClientRect().top;
        resizer_x=document.getElementById('resize-container').getBoundingClientRect().left
        resizer_y=document.getElementById('resize-container').getBoundingClientRect().top
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
      }


      //resize from top right
      topRight.addEventListener('mouseover',()=>
      {
        console.log("OVER")
      //  console.log(this);
        this.mousOver = true; 
        console.log("MOUSEOVER VALUE IN LISTSNER",this.mousOver)
      })

      topRight.addEventListener('mouseout',()=>
      {
        console.log("OUT")
        this.mousOver=false
      })
      
      topRight.addEventListener('mousedown',(e:any)=>
      {
        this.countMouseUp=0
        this.dragEvent=true
        getOriginal(e,event.target.id);
        console.log('holaaaa');
        window.addEventListener('mousemove', resizeTopRight)
        // console.log("MOUSEUP COUNT IN MOUSEDON TOP RIGHT",this.countMouseUp)
        window.addEventListener('mouseup', stopResize.bind(this))
      })


      function resizeTopRight(e)
      {

        console.log("PARENT ID",event.target.parentNode.id)
        console.log("CSS FLAOT",document.getElementById(event.target.parentNode.id).classList[1])
        // console.log("TARGET ID",event.target)
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        const resizerWidth=resizer_width+(e.pageX-original_mouse_x)
        const resizerHeight=resizer_height-(e.pageY-original_mouse_y)
        if(document.getElementById(event.target.parentNode.id).classList[1]===undefined || document.getElementById(event.target.parentNode.id).classList[1]==='left')
        {
          // console.log(width,document.getElementById('editable-block').clientWidth)
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-50){
            document.getElementById(event.target.id).style.width=width+'px'
            document.getElementById(event.target.id).style.height=height+'px'
            document.getElementById('resize-container').style.width=resizerWidth+'px'
            document.getElementById('resize-container').style.height=resizerHeight+'px'
          }

        }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='right'){
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-50){
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
        }
      }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='center'){
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-50){
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
        }
      }

        // console.log("IMAGE POS",document.getElementById(event.target.id).getBoundingClientRect().left)
        // console.log("Resize-container",document.getElementById('resize-container').style.left)

      }

      //resize from top left side

      topLeft.addEventListener('mouseover',()=>
      {
        console.log("OVER")
      //  console.log(this);
        this.mousOver = true; 
        console.log("MOUSEOVER VALUE IN LISTSNER",this.mousOver)
      })

      topLeft.addEventListener('mouseout',()=>
      {
        console.log("OUT")
        this.mousOver=false
      })
      
      topLeft.addEventListener('mousedown',(e:any)=>
      {
        this.countMouseUp=0
        this.dragEvent=true
        getOriginal(e,event.target.id);
        console.log('holaaaa');
        window.addEventListener('mousemove', resizsTopLeft)
        // console.log("MOUSEUP COUNT IN MOUSEDON TOP RIGHT",this.countMouseUp)
        window.addEventListener('mouseup', stopResize.bind(this))
      })

      function resizsTopLeft(e)
      {
        // console.log("RESIZE FROM TOP LEFT")
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        const resizerWidth=resizer_width-(e.pageX-original_mouse_x)
        const resizerHeight=resizer_height-(e.pageY-original_mouse_y)
        // document.getElementById(event.target.id).style.width=width+'px'
        // document.getElementById(event.target.id).style.height=height+'px'
        // document.getElementById('resize-container').style.width=resizerWidth+'px'
        // document.getElementById('resize-container').style.height=resizerHeight+'px'
        if(document.getElementById(event.target.parentNode.id).classList[1]===undefined || document.getElementById(event.target.parentNode.id).classList[1]==='left')
        {
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth){
            console.log("width top left",width,document.getElementsByClassName('editable-block')[0].clientWidth)
            document.getElementById(event.target.id).style.width=width+'px'
            document.getElementById(event.target.id).style.height=height+'px'
            document.getElementById('resize-container').style.width=resizerWidth+'px'
            document.getElementById('resize-container').style.height=resizerHeight+'px'
          }
         
        }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='right'){

          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160){
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
        }
      }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='center'){
          console.log("HEY THIS IS CENTER RESIABLE FRO TOP LEFT")
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160){
            console.log("CENTER",width,document.getElementsByClassName('editable-block')[0].clientWidth-160)
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
        }
      }
        // if(document.getElementById(event.target))


      }



      bottomLeft.addEventListener('mouseover',()=>
      {
        console.log("OVER")
      //  console.log(this);
        this.mousOver = true; 
        console.log("MOUSEOVER VALUE IN LISTSNER",this.mousOver)
      })

      bottomLeft.addEventListener('mouseout',()=>
      {
        console.log("OUT")
        this.mousOver=false
      })
      
      bottomLeft.addEventListener('mousedown',(e:any)=>
      {
        this.countMouseUp=0
        this.dragEvent=true
        getOriginal(e,event.target.id);
        console.log('holaaaa');
        window.addEventListener('mousemove', resizsTopLeft)
        // console.log("MOUSEUP COUNT IN MOUSEDON TOP RIGHT",this.countMouseUp)
        window.addEventListener('mouseup', stopResize.bind(this))
      })

      function resizsBottomLeft(e)
      {
        console.log("RESIZE FROM BOTTOM LEFT")
        const width = original_width +(e.pageX - original_mouse_x)
        const height = original_height + (e.pageY - original_mouse_y)
        const resizerWidth=resizer_width+(e.pageX-original_mouse_x)
        const resizerHeight=resizer_height+(e.pageY-original_mouse_y)
       
        if(document.getElementById(event.target.parentNode.id).classList[1]===undefined || document.getElementById(event.target.parentNode.id).classList[1]==='left')
        {
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160)
          {
            document.getElementById(event.target.id).style.width=width+'px'
            // document.getElementById(event.target.id).style.height='auto'
            document.getElementById('resize-container').style.width=resizerWidth+'px'
            // document.getElementById('resize-container').style.height='auto'
            document.getElementById(event.target.id).style.left= original_x + (e.pageX - original_mouse_x) + 'px'
            document.getElementById(event.target.id).style.bottom= original_y + (e.pageY - original_mouse_y) + 'px'
          }

        }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='right'){
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160)
          {
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
          }
        }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='center'){
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160)
          {
            console.log("CENTER")
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
          }
        }
        // if(document.getElementById(event.target))


      }


      
      bottomRight.addEventListener('mouseover',()=>
      {
        console.log("OVER")
      //  console.log(this);
        this.mousOver = true; 
        console.log("MOUSEOVER VALUE IN LISTSNER",this.mousOver)
      })

      bottomRight.addEventListener('mouseout',()=>
      {
        console.log("OUT")
        this.mousOver=false
      })
      
      bottomRight.addEventListener('mousedown',(e:any)=>
      {
        this.countMouseUp=0
        this.dragEvent=true
        getOriginal(e,event.target.id);
        console.log('holaaaa');
        window.addEventListener('mousemove', resizsBottomRight)
        // console.log("MOUSEUP COUNT IN MOUSEDON TOP RIGHT",this.countMouseUp)
        window.addEventListener('mouseup', stopResize.bind(this))
      })

      function resizsBottomRight(e)
      {
        console.log("RESIZE FROM BOTTOM LEFT")
        const width = original_width +(e.pageX - original_mouse_x)
        const height = original_height + (e.pageY - original_mouse_y)
        const resizerWidth=resizer_width+(e.pageX-original_mouse_x)
        const resizerHeight=resizer_height+(e.pageY-original_mouse_y)
        
        if(document.getElementById(event.target.parentNode.id).classList[1]===undefined || document.getElementById(event.target.parentNode.id).classList[1]==='left')
        {
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160)
          {
          document.getElementById(event.target.id).style.width=width+'px'
        document.getElementById(event.target.id).style.height=height+'px'
        document.getElementById('resize-container').style.width=resizerWidth+'px'
        document.getElementById('resize-container').style.height=resizerHeight+'px'
          }
        
        }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='right'){
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160)
          {
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
          }
        }
        else if(document.getElementById(event.target.parentNode.id).classList[1]==='center'){
          if(width<document.getElementsByClassName('editable-block')[0].clientWidth-160)
          {
          document.getElementById(event.target.id).style.pointerEvents='none'
          document.getElementById('resize-container').style.pointerEvents='none'
          document.getElementById(event.target.id).style.width=width+'px'
          document.getElementById(event.target.id).style.height=height+'px'
          document.getElementById('resize-container').style.width=resizerWidth+'px'
          document.getElementById('resize-container').style.height=resizerHeight+'px'
          document.getElementById('resize-container').style.left=document.getElementById(event.target.id).getBoundingClientRect().left-290+'px'
          }
        }
        // if(document.getElementById(event.target))


      }




      function stopResize()
      {

        // console.log("event lisners are ")
        // if(this.countMouseUp>0)
        // {
          // console.log("COUNTE MOUSUP",this.countMouseUp)
        //   window.removeEventListener('mouseup', stopResize,true);
        // }
        
        
        // console.log("THIS IS CALLED MANY TIMES",event.target)
        this.mouseover=false
        this.dragEvent=false
          
        window.removeEventListener('mousemove', resizeTopRight)
        window.removeEventListener('mousemove',resizsTopLeft)
        window.removeEventListener('mousemove',resizsBottomLeft)
        window.removeEventListener('mousemove',resizsBottomRight)
        document.getElementById(event.target.id).style.pointerEvents='auto'
        if(this.countMouseUp===0)
        {
          // console.log("BLUR BLUR BLUR JKBJHDBJHFVJHJKKjk")

          this.imgBlur(this)
        }

        this.countMouseUp=1;

        removeListner()
        
        // window.removeEventListener('mousedown', stopResize.bind(this));
        
      }

      function removeListner()
      {
        // console.log("LISTNER REMOVE")
        window.removeEventListener('mouseup', stopResize.bind(this),true);
      }
     

      // console.log("REISZER DIV",document.getElementById('resizer-container'))
    }

    //create alignment List
    const navigationContainer=document.getElementById('div')
    if(navigationContainer===null)
    {
      const navigationTag=document.createElement('ul')
      navigationTag.setAttribute('class','navigation')
     


      const left_align=document.createElement('li')
      // left_align.setAttribute('')
      const left_btn=document.createElement('button')
      left_align.appendChild(left_btn)
      left_btn.innerHTML=`<svg width="400" height="400" viewBox="0 0 400 400" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
          <g filter="url(#filter0_d)">
              <path d="M400 0H0V44H400V0Z" />
              <path d="M399 89H268V133H399V89Z" />
              <path d="M399 178H268V222H399V178Z" />
              <path d="M399 267H268V311H399V267Z" />
              <path d="M400 356H0V400H400V356Z" />
              <path d="M249 88H0V132H249V88Z" />
              <path d="M249 267H0V311H249V267Z" />
              <path d="M49 132H0V267H49V132Z" />
              <path d="M249 132H200V267H249V132Z" />
          </g>
      </g>
      <defs>
          <filter id="filter0_d" x="-4" y="0" width="408" height="408"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <clipPath id="clip0">
              <rect width="400" height="400" fill="white" />
          </clipPath>
      </defs`

      navigationTag.appendChild(left_align)


      //center align


      const center_align=document.createElement('li')
      // left_align.setAttribute('')
      const center_btn=document.createElement('button')
      center_btn.innerHTML=`<svg width="400" height="400" viewBox="0 0 400 400" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
          <g filter="url(#filter0_d)">
              <path d="M400 89H151V133H400V89Z" />
              <path d="M400 268H151V312H400V268Z" />
              <path d="M200 133H151V268H200V133Z" />
              <path d="M400 133H351V268H400V133Z" />
              <path d="M400 0H0V44H400V0Z" />
              <path d="M131 89H0V133H131V89Z" />
              <path d="M131 178H0V222H131V178Z" />
              <path d="M131 267H0V311H131V267Z" />
              <path d="M400 356H0V400H400V356Z" />
          </g>
      </g>
      <defs>
          <filter id="filter0_d" x="-4" y="0" width="408" height="408"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <clipPath id="clip0">
              <rect width="400" height="400" fill="white" />
          </clipPath>
      </defs>
  </svg>`

      center_align.appendChild(center_btn)
      
      navigationTag.appendChild(center_align)

      //right align
      const right_align=document.createElement('li')
      // left_align.setAttribute('')
      const right_btn=document.createElement('button')
      right_btn.innerHTML=`<svg width="400" height="400" viewBox="0 0 400 400" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0)">
          <g filter="url(#filter0_d)">
              <path d="M400 0H0V44H400V0Z" />
              <path d="M399 89H338V133H399V89Z" />
              <path d="M399 178H338V222H399V178Z" />
              <path d="M399 267H338V311H399V267Z" />
              <path d="M400 356H0V400H400V356Z" />
              <path d="M324 88H75V132H324V88Z" />
              <path d="M324 267H75V311H324V267Z" />
              <path d="M124 132H75V267H124V132Z" />
              <path d="M324 132H275V267H324V132Z" />
              <path d="M61 89H0V133H61V89Z" />
              <path d="M61 178H0V222H61V178Z" />
              <path d="M61 267H0V311H61V267Z" />
          </g>
      </g>
      <defs>
          <filter id="filter0_d" x="-4" y="0" width="408" height="408"
              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <clipPath id="clip0">
              <rect width="400" height="400" fill="white" />
          </clipPath>
      </defs>
  </svg>`
      right_align.appendChild(right_btn)

      navigationTag.appendChild(right_align)
      document.getElementById('resize-container').appendChild(navigationTag)
      // console.log(navigationTag)
      
      //event listener on alignments
      
      right_btn.addEventListener('mouseover',()=>
      {
        this.shouldAlign=true
        console.log("TANTADA  1")

      })

      right_btn.addEventListener('mouseout',()=>
      {
        this.shouldAlign=false
        console.log("TANTADA  2")
      })


      right_btn.addEventListener('click',()=>
      {
        console.log("event parnet  id",event.target.parentNode.id)
          console.log("LALALLA")
          document.getElementById(event.target.parentNode.id).classList.remove('center')
          document.getElementById(event.target.parentNode.id).classList.remove('left')
          document.getElementById(event.target.parentNode.id).classList.add('right')
          document.getElementById(event.target.id).style.float='right'
          // document.getElementById('resize-container').remove();
          const imageRatio = document.getElementById(event.target.id).getBoundingClientRect();
          setTimeout(() => {
            console.log(imageRatio.left);
            // document.getElementsByClassName('resize-container')[0].classList.add('right')
            document.getElementById('resize-container').style.left=imageRatio.left-290 +'px';
            console.log("FLOAT RIGHT COMPLETED")
            this.shouldAlign=false
            this.imgBlur(this)
          }, 10);
          
         

      })


      //center alignment

      right_align.appendChild(right_btn)

      navigationTag.appendChild(right_align)
      document.getElementById('resize-container').appendChild(navigationTag)
      // console.log(navigationTag)
      
      //event listener on alignments
      
      center_btn.addEventListener('mouseover',()=>
      {
        this.shouldAlign=true
        console.log("TANTADA  1")

      })

      center_btn.addEventListener('mouseout',()=>
      {
        this.shouldAlign=false
        console.log("TANTADA  2")
      })


      center_btn.addEventListener('click',()=>
      {
          console.log("LALALLA")
          document.getElementById(event.target.parentNode.id).classList.remove('right')
          document.getElementById(event.target.parentNode.id).classList.remove('left')
          document.getElementById(event.target.id).style.float='none'
          document.getElementById(event.target.parentNode.id).classList.add('center')
          // document.getElementById('resize-container').remove();
          const imageRatio = document.getElementById(event.target.id).getBoundingClientRect();
          setTimeout(() => {
            console.log(imageRatio.left);
            // document.getElementsByClassName('resize-container')[0].classList.add('right')
            document.getElementById('resize-container').style.left=imageRatio.left-290 +'px';
            this.shouldAlign=false
            this.imgBlur(this)

          }, 10);
          
      })


      left_btn.addEventListener('mouseover',()=>
      {
        this.shouldAlign=true
        console.log("TANTADA  1")

      })

      left_btn.addEventListener('mouseout',()=>
      {
        this.shouldAlign=false
        console.log("TANTADA  2")
      })


      left_btn.addEventListener('click',()=>
      {
          console.log("LALALLA")
          document.getElementById(event.target.parentNode.id).classList.remove('right')
          document.getElementById(event.target.parentNode.id).classList.remove('left')
          document.getElementById(event.target.id).style.float='left'
          document.getElementById(event.target.parentNode.id).classList.add('center')
          // document.getElementById('resize-container').remove();
          const imageRatio = document.getElementById(event.target.id).getBoundingClientRect();
          setTimeout(() => {
            console.log(imageRatio.left);
            // document.getElementsByClassName('resize-container')[0].classList.add('right')
            document.getElementById('resize-container').style.left=imageRatio.left-290 +'px';
            this.shouldAlign=false
            this.imgBlur(event)

          }, 10);
          
      })

      
    }

  }


  imgBlur(event:any)
  {
    

    console.log("BLURRRRRRRRRRRRRRRRRRRRR")
    // console.log("BLUR",event.target.id)
    console.log("DRAGEVENT",this.dragEvent)
    console.log("MOUSEOVER",this.mousOver)
    if(this.mousOver===false)
    {
      console.log("MOUSEOVER FALSE")
      if(this.dragEvent===false )
      {
        console.log("DRAGEEVENT FALSE")
        if(document.getElementById('resize-container')!==null)
        {
            if(this.shouldAlign===false)
            {
              document.getElementById('resize-container').remove()
            }


        }


      }

    }

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
    
    document.getElementById("editable-block").focus();
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
      this.placeholder = this.editorConfig?.placeholder ?? 'Please Add Some Text';

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

  saveEmoji(event:any){
    console.log("CONTAINER",event)
    const emojiContainer=document.createElement('span')
    emojiContainer.innerHTML=event
    this.sel.removeAllRanges();
    const range = this.oldRange.cloneRange();
    range.insertNode(emojiContainer);
    range.setStartAfter(emojiContainer);
    range.collapse();
    this.sel.removeAllRanges();
    this.sel.addRange(range);
    
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
   
  /**
  * @param event - This parameter is an event that is occurred whenever we make changes inside the div contenteditable
  */
  setValue(innerText: string): void {
    this.innerText = innerText;

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

  /**
  * This function is called whenever the mention tab is closed
  */
  mentionClosed(): void {
    // insert mentions
    // console.log("MENTOOON",this.tribute)
    if (this.tribute && this.tribute !== '') {
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

  /**
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
    try {
      const { startContainer } = this.sel.getRangeAt(0);
      if(this.checkValidOperation(startContainer)) {
        
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
        } else {
          this.focus();
        }
      } else {
        this.focus();
      }
    } catch(err) {
      this.focus();
    }
    this.toolbarOperations(event?.id, event?.value);
  }

  /**
   * 
   * @param id- represents the toolbar button that was clicked
   * @param value - Value that is passed from the toolbar to editor to perform operations
   */
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
        if(!this.sel.getRangeAt(0).collapsed) {
          this.sel.getRangeAt(0).collapse();
        }
        break;
      case 'textColor':
        document.execCommand('styleWithCSS', false, '');
        document.execCommand('foreColor', false, value);
        if(!this.sel.getRangeAt(0).collapsed) {
          this.sel.getRangeAt(0).collapse();
        }
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


  /**
   * 
   * @param elem - The element whose parent element we need to find
   * @param tagName - Tag name to check if it is the parent node of elem
   */
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

  /**
   * 
   * @param char - Represents the tribute that was clicked from the toolbar i.e @ or #
   */
  insertTribute(char: string): void {
    if (this.sel) {
      if (this.oldRange) {
        const code = char === '@' ? 'Digit2' : 'Digit3';
        const event = new KeyboardEvent('keydown', { key: `${char}`, code: `${code}` });
        this.sel.removeAllRanges();
        this.sel.addRange(this.oldRange);
        document.getElementById(this.id).dispatchEvent(event);
        const a = document.createTextNode(`${char}`);
        this.oldRange.insertNode(a);
        this.oldRange.setStartAfter(a);
        this.setValue(document.getElementById(this.id).innerText);
      } else {
        this.focus();
        this.oldRange = this.sel.getRangeAt(0).cloneRange();
        this.insertTribute(char);
      }
    }
  }

  show_emoji(pos:any)
  {
    // console.log("POS CONTAINER",pos)
    // console.log("POS",posx,posy);
    const spParent = document.createElement('span');
    spParent.setAttribute('contenteditable', 'true');
    const sp = document.createElement('span');
    // sp.setAttribute('id','emoji_data');
    sp.setAttribute('contenteditable', 'false');
    sp.style.backgroundImage="url('../../../assets/images/sprite-20.png')";
    sp.style.width=20+"px";
    sp.style.height=20+"px";
    sp.style.display='inline-block';
    sp.style.backgroundPositionX=pos.x;
    sp.style.backgroundPositionY=pos.y;
    spParent.appendChild(sp);
    this.sel.removeAllRanges();
    const range = this.oldRange.cloneRange();
    range.insertNode(spParent);
    range.setStartAfter(spParent);
    range.collapse();
    this.sel.addRange(range);

    spParent.addEventListener('click',(e)=>
    {
      
      // var elem = document.createElement("textarea");
      // document.body.appendChild(elem);
      // elem.value = e.target;
      // elem.select();
      // document.execCommand("copy");
      // document.body.removeChild(elem);
  
    })

  }

  clickedOnImage() {
    this.clicked = true;
  }
}
