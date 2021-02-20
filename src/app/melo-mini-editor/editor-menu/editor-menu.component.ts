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
  @Output() imageInEditor=new EventEmitter<any>();
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
  savedLinks:object={ };




  image: any;

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
    this.image = null;
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

  imgRemove(fileId): void {
    // alert(fileId)
    this.imgUrl.splice(fileId, 1);
    console.log('image array after remove', this.imgArr);
  }

  attachPopover(): void {
    this.filesArray = [];
    this.upload = !this.upload;
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
  
  // Image popup code begins

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if(event?.dataTransfer?.files && event?.dataTransfer?.files.length > 0) {
      if(this.validImage(event?.dataTransfer?.files[0])) {
        this.showAlert = false;
        this.readImageFile(event?.dataTransfer?.files[0]);
      } else {
        this.alertMsg = 'Please choose image file only';
        this.showAlert = true;
      }
    }
    this.enter = false;
  }

  validImage(file: any): boolean {
    const fileExtension = file?.name?.slice(file?.name.lastIndexOf('.') + 1);
    switch(fileExtension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return true; 

      default: return false;
    }
  }

  saveImage(): void{
    this.imageInEditor.emit(this.image);
  }

  readImageFile(file:any): void {
    const fReader = new FileReader();
    fReader.readAsDataURL(file);
    fReader.onloadend =  (event) => {
      this.image = {
        url: event.target.result,
        file
      };
    };
  }

  changeImage(event: any): void {
    if(this.validImage(event?.target?.files[0])) {
      this.showAlert = false;
      this.readImageFile(event?.target?.files[0]);
    } else {
        this.alertMsg = 'Please choose image file only';
        this.showAlert = true;
    }
  }

   // Image popup code ends

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

  dragenter(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.enter = true;
  }

  dragover(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  dragend(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.enter = false;
  }

  dragleave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.enter = false;
  }

  alignPopover(): void {
    this.alignment = !this.alignment;
  }

  addLinks(): void {
    this.addLink = !this.addLink;
  }

  saveLinks(): void { 
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

  closeFontStylePopover(): void {
    this.fontStyle = false;
  }
  hideAlert(): void {
    this.showAlert = false;
  }
}
