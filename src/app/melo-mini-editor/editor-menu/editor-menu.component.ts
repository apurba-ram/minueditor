import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { EditorConfig, ToolbarConfig } from '../editor-config-interface';
@Component({
  selector: 'app-editor-menu',
  templateUrl: './editor-menu.component.html',
  styleUrls: ['./editor-menu.component.less', '../theme.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorMenuComponent implements OnInit {
  @Input() editorConfig: EditorConfig;
  @Input() toolbarConfig: ToolbarConfig;
  @Output() buttonClick: EventEmitter<any> = new EventEmitter();
  // @Input() multiple: boolean;
  @Output() sendSavedFiles = new EventEmitter<any>();
  @Output() imgInEditor=new EventEmitter<any>();
  @Output() linkInEditor=new EventEmitter<any>()
  enter = false;
  upload = false;
  uploadImage = false;
  alignment = false;
  addLink = false;
  listStyle = false;
  filesArray: Array<object>[];
  ShowFiles: boolean;
  fontStyle = false;
  fillColor: boolean[];
  setTextColor = false;
  showAlert: boolean = false;
  alertMsg: string;
  savedFiles: any = [];
  savedImages:any=[]
  imgUrl: any = []; //img url array
  imgArr: Array<object> = [];
  linkUrl:string
  linkText:string
  linkTitle:string
  inValidUrl:boolean
  inValidUrlMsg:string
  inValidLinkTitle=''
  inValidLinkText=''
  savedLinks:object={ }
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
    };
    this.filesArray = [];
    this.fillColor = Array(2).fill(false);
  }

  ngOnInit(): void {}

  buttonClicked(event: any): void {
  event.stopPropagation();
  if (event?.target?.dataset?.id &&
    (event?.target?.dataset?.id !== 'link' &&
      event?.target?.dataset?.id !== 'attachment' &&
      event?.target?.dataset?.id !== 'fill-color' &&
      event?.target?.dataset?.id !== 'text-color')) {
        this.buttonClick.emit(event?.target?.dataset);
  }
}

  colorChange(type: 'textColor' | 'fillColor'){
    this.buttonClick.emit({
      id: type,
      value: type === 'textColor' ? this.toolbarConfig?.fontColor : this.toolbarConfig?.backgroundColor
    });
  }

  saveFiles(): void {
    this.savedFiles.push.apply(this.savedFiles, this.filesArray);
    this.filesArray = [];

    console.log('files after saving in child', this.savedFiles);
    this.sendSavedFiles.emit(this.savedFiles);
    this.upload = false;
    // console.log("emit event",this.sendSavedFiles.emit(this.savedFiles))
  }



  saveImage():void
  {
    //imgInEditor
    this.savedImages.push.apply(this.savedImages,this.imgUrl)
    this.imgUrl=[]
    this.uploadImage=false
    console.log("after saving images",this.savedImages)
    this.imgInEditor.emit(this.savedImages)

  }

  readImageFile(file:any): void {
    // console.log("img",InputValue)
    
    var fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onloadend =  (event) => {
      const obj = {
        imgUrl: event.target.result,
        file
      };
      this.imgUrl[0]=(obj);
      this.imgUrl = [...this.imgUrl]; // Object.assign({}, this.imgUrl);
      console.log("Image after read array",this.imgUrl)
    };
  }

  changeImage(e: any): void {

    console.log('Image from input', e.target.files,e.target.files[0].name.split('.'));
    
    for(const file of e.target.files) {
      if (
              e.target.files[0].name.split('.')[1]==="jpg" ||
              e.target.files[0].name.split('.')[1]==="jpeg" ||
              e.target.files[0].name.split('.')[1]==="png" ||
              e.target.files[0].name.split('.')[1]==="gif"
      )
      {
        this.readImageFile(file);
      }
      else
      {
        this.alertMsg = 'Please choose image file only';
        this.showAlert = true;
      }
      
    }
    return;
    //if multeple files are allowed
    // for (var key in e.target.files) {
    //   if (e.target.files.hasOwnProperty(key)) {
    //     //  console.log(key + " -> " + e.target.files[key]);
    //     if (
    //       e.target.files[key].name.split('.')==="jpg" ||
    //       e.target.files[key].name.split('.')==="jpeg" ||
    //       e.target.files[key].name.split('.')==="png" ||
    //       e.target.files[key].name.split('.')==="gif"
    //     ) {
    //       // this.readImageFile(e.target,e.target.files[key]);
    //       // this.imgArr.push(e.target.files[key]);
    //       // console.log('image arrys', this.imgArr);
    //     } else {
    //       // alert("Please choose image file only")
    //       this.alertMsg = 'Please choose image file only';
    //       this.showAlert = true;
    //       // this.uploadImage=false
    //     }
    //   }
    // }

    //  console.log("Image Array",this.imgArr)
    // if (this.imgArr.length > 0) {
    //   this.ShowFiles = true;
    // }
    // console.log('files Array', this.imgArr);
    // e.target.value = '';
  }

  imgRemove(fileId): void {
    // alert(fileId)
    this.imgUrl.splice(fileId, 1);
    console.log('image array after remove', this.imgArr);
  }

  attachPopover(): void {
    this.filesArray = [];
    this.upload = !this.upload;
  }
  dragenter(e): void {
    e.preventDefault();
    e.stopPropagation();
    this.enter = true;
  }

  dropFile(e): void {
    e.preventDefault();
    console.log(
      'dropped multple files',
      e.dataTransfer.files,
      'type',
      Array.isArray(e.dataTransfer.files)
    );
    console.log(
      'dropped files',
      e.dataTransfer.files,
      'type',
      Array.isArray(e.dataTransfer.files)
    );

    for (var key in e.dataTransfer.files) {
      if (e.dataTransfer.files.hasOwnProperty(key)) {
        console.log(key + ' -> ' + e.dataTransfer.files[key]);
        this.filesArray.push(e.dataTransfer.files[key]);

      }
    }
  }
  dropImage(e) {
    // console.log(e.t)
    e.preventDefault();
    // console.log("dropped images",e.dataTransfer.files,"type",Array.isArray(e.dataTransfer.files))
    // console.log("check extension",e.dataTransfer.files[0].name.split('.'[0]).pop())
    // console.log('DROP THE BOMB');
    console.log("Image is droped")
    const fileName = e.dataTransfer.files[0].name;
    const fileSplit = fileName.split('.');
    const fileExtension = fileSplit[fileSplit.length - 1];
    // console.log(fileName, fileExtension);

    for (var key in e.dataTransfer.files) {
      if (e.dataTransfer.files.hasOwnProperty(key)) {
        this.readImageFile(e.dataTransfer.files[0])
        // this.imgUrl[0]=e.dataTransfer.files[0]
        // console.log("Image Array",this.imgUrl)
        // console.log(key + " -> " + e.dataTransfer.files[key]);
        // if (
        //   e.target.files[0].name.split('.')[1]==="jpg" ||
        //   e.target.files[0].name.split('.')[1]==="jpeg" ||
        //   e.target.files[0].name.split('.')[1]==="png" ||
        //   e.target.files[0].name.split('.')[1]==="gif"
        // ) {
        //   this.imgArr.push(e.dataTransfer.files[key]);
        // } else {
        //   // alert("Please choose Image file only")
        //   this.alertMsg = 'Please choose Image file only';
        //   this.showAlert = true;
        //   break;
        // }
      }
    }
  }

  fileRemove(fileId): void {
    console.log('file remove');
    console.log(fileId);
    //  delete this.filesArray[fileId]
    console.log('upload value before delete', this.upload);
    this.filesArray.splice(fileId, 1);
    console.log('uplod value after delete', this.upload);
    console.log('file Array after removed', this.filesArray);
  }

  //file is uploaded from browse button
  fileFromInput(e): void {
     console.log('file from input');
    // this.filesArray=[...e.target.files]
     console.log("Target files",e.target.files,"type",Array.isArray(e.target.files))
    let i = this.filesArray.length - 1;
    for (var key in e.target.files) {
      if (e.target.files.hasOwnProperty(key)) {
        this.filesArray.push(e.target.files[key]);
        console.log(key + ' -> ' + e.target.files[key]);
      
      }
       
    }

    // console.log("file Array",this.filesArray)
    if (this.filesArray.length > 0) {
      this.ShowFiles = true;
    }
    e.target.value = ''
    // console.log('files Array', this.filesArray);
  }

  dragover(e): void {
    e.preventDefault();
    // console.log("dragover")
    // e.preventDefault();
    // e.stopPropagation()
    // this.filesArray.push(e.dataTransfer.types)
    // console.log(e.dataTransfer.types)
    // console.log(this.filesArray)
    // this.enter = true;
  }

  dragend(e): void {
    // console.log('dragend');
    this.enter = false;
  }

  dragleave(e): void {
    // console.log('dragleave');
    this.enter = false;
  }

  alignPopover(): void {
    this.alignment = !this.alignment;
  }

  imagePopover(): void {
    this.uploadImage = !this.uploadImage;
  }

  addLinks(): void {

    this.addLink = !this.addLink;

  }

  saveLinks():void
  { 
    console.log("Link Data",this.linkText,this.linkTitle,this.linkUrl)
    //check url is valid or not
    if(this.linkUrl===undefined)
    {
        this.inValidUrlMsg="Please provde a  URL"
    }
    else if(this.linkText===undefined)
    {
      this.inValidLinkTitle="Please Provide a Text"
    }
    else if(this.linkTitle==undefined)
    {
      this.inValidLinkText="Please Provide a Title"
    }
    else{    
    const rex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if(this.linkUrl?.match(rex))  
    {
      // console.log("GOOD")
      const obj = {
            linkUrl:this.linkUrl,
            linkText:this.linkText?.trim(),
            linkTitle:this.linkTitle?.trim()
          };
      
          console.log("object ",obj)
          this.savedLinks={...obj}
          console.log("saved Link",this.savedLinks)
          this.linkInEditor.emit(this.savedLinks)
          this.linkText=''
          this.linkTitle=''
          this.linkUrl=''
          this.savedLinks={}
          this.addLink=!this.addLink
  }
    else{
 
            this.inValidUrlMsg="Please provide a valid URL"
    }
  }
      // try {
      //   // this.inValidUrl=false
      //   this.inValidUrlMsg=''
      // let  url = new URL(this.linkUrl);
      // const obj = {
      //   linkUrl:this.linkUrl,
      //   linkText:this.linkText.trim(),
      //   linkTitle:this.linkTitle.trim()
      // };
      
      // console.log("object ",obj)
      //     this.savedLinks={...obj}
      //     console.log("saved Link",this.savedLinks)
      //     this.linkInEditor.emit(this.savedLinks)
      //     this.linkText=''
      //     this.linkTitle=''
      //     this.linkUrl=''
      //     this.savedLinks={}
      //     this.addLink=!this.addLink
      // // console.log("url is perfect")
      // }
      //  catch (_) {
      //   //  console.log("not valid url")
      //       // this.inValidUrl=true
      //       this.inValidUrlMsg="Please provide a valid URL"
      //    // return  false;  
      // }
     

   }
  listStyles(): void {
    this.listStyle = !this.listStyle;
  }
  fontStylePopover(): void {
    this.fontStyle = !this.fontStyle;
  }
  closePopover(): void {
    this.filesArray = [];
    this.alignment = false;
    this.uploadImage = false;
    this.upload = false;
    this.addLink = false;
    this.listStyle = false;
    this.ShowFiles = false;
    this.fontStyle = false;
    this.fillColor = Array(2).fill(false);
    this.setTextColor = false;
  }

  closeAlignPopover(): void {
    this.alignment = false;
  }

  closeListStylesPopover(): void {
    this.listStyle = false;
  }

  closeAddLinksPopover(): void {
    this.addLink = false;
  }

  closeAttachPopover(): void {
    this.filesArray = [];
    this.upload = false;
    this.ShowFiles = false;
  }

  closeImagePopover(): void {
    this.uploadImage = false;
  }
  closeFontStylePopover(): void {
    this.fontStyle = false;
  }
  hideAlert(): void {
    this.showAlert = false;
  }
}
