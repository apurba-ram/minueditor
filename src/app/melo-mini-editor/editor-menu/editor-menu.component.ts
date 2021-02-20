import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
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
  @Output() buttonClick: EventEmitter<string> = new EventEmitter();
  @Input() multiple: boolean;
  @Output() sendSavedFiles = new EventEmitter<any>();
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
  showAlert:boolean=false
  alertMsg:string
  savedFiles:any=[]
  imgArr: Array<object> = [];
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
    if (event?.target?.dataset?.id === 'link' ||
        event?.target?.dataset?.id === 'attachment' ||
        event?.target?.dataset?.id === 'fill-color' ||
        event?.target?.dataset?.id === 'text-color') {

    } else if (event?.target?.dataset?.id) {
      this.buttonClick.emit(event?.target?.dataset);
    }
  }

  saveFiles():void
  {
    this.savedFiles.push.apply(this.savedFiles,this.filesArray)
    this.filesArray=[]
    
    console.log("files after saving in child",this.savedFiles)
    this.sendSavedFiles.emit(this.savedFiles)
    this.upload=false
    // console.log("emit event",this.sendSavedFiles.emit(this.savedFiles))

  }


  changeImage(e: any): void {
    
    console.log('Image from input');
    // this.filesArray=[...e.target.files]
      //  console.log("Target Images",e.target.files,"type",Array.isArray(e.target.files))
       let i=this.filesArray.length-1
       for (var key in e.target.files) {
         if (e.target.files.hasOwnProperty(key)) {
            //  console.log(key + " -> " + e.target.files[key]);
             if(e.target.files[key].name.split('.').includes('jpg')
              || e.target.files[key].name.split('.').includes('jpeg')
              || e.target.files[key].name.split('.').includes('png')
              || e.target.files[key].name.split('.').includes('gif')
               )
             {
              this.imgArr.push(e.target.files[key]) 
              console.log("image arrys",this.imgArr)
             }
             else
             {
                // alert("Please choose image file only")
                this.alertMsg="Please choose image file only"
                this.showAlert=true 
                // this.uploadImage=false
               
             }
            
         }         
     }

      //  console.log("Image Array",this.imgArr)
     if (this.imgArr.length > 0) {
       this.ShowFiles = true;
     }
     console.log('files Array', this.imgArr);
     e.target.value = ''
   
  }

  imgRemove(fileId):void {
      // alert(fileId)
      this.imgArr.splice(fileId,1)
      console.log("image array after remove",this.imgArr)
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

  dropFile(e): void
  {
      e && e.preventDefault();
      console.log("dropped multple files",e.dataTransfer.files,"type",Array.isArray(e.dataTransfer.files))
      console.log("dropped files",e.dataTransfer.files,"type",Array.isArray(e.dataTransfer.files))
      

      for (var key in e.dataTransfer.files) {
        if (e.dataTransfer.files.hasOwnProperty(key)) {
            console.log(key + " -> " + e.dataTransfer.files[key]);
            if(e.dataTransfer.files[key].name.split('.').includes('jpg')
            ||e.dataTransfer.files[key].name.split('.').includes('jpeg')
            ||e.dataTransfer.files[key].name.split('.').includes('png')
            ||e.dataTransfer.files[key].name.split('.').includes('gif')
            )
            {
                // alert("image files are not allowed")
                this.alertMsg="image files are not allowed"
                this.showAlert=true;
            }
            else
            {
              this.filesArray.push(e.dataTransfer.files[key])
            }
           
        }

      }
    }
  dropImage(e) {
    // console.log(e.t)
    e && e.preventDefault();
    // console.log("dropped images",e.dataTransfer.files,"type",Array.isArray(e.dataTransfer.files))
    // console.log("check extension",e.dataTransfer.files[0].name.split('.'[0]).pop())
    // console.log('DROP THE BOMB');
    const fileName = e.dataTransfer.files[0].name;
    const fileSplit = fileName.split('.');
    const fileExtension = fileSplit[fileSplit.length - 1];
    // console.log(fileName, fileExtension);
   
    for (var key in e.dataTransfer.files) {
      if (e.dataTransfer.files.hasOwnProperty(key)) {
          // console.log(key + " -> " + e.dataTransfer.files[key]);
          if(e.dataTransfer.files[key].name.split('.').includes('jpg')
          ||e.dataTransfer.files[key].name.split('.').includes('jpeg')
          ||e.dataTransfer.files[key].name.split('.').includes('png')
          ||e.dataTransfer.files[key].name.split('.').includes('gif')
          )
          {
            this.imgArr.push(e.dataTransfer.files[key])
          }
          else
          {
            // alert("Please choose Image file only")
            this.alertMsg="Please choose Image file only"
            this.showAlert=true
            break
          }
          }
         
      }

    }
  

  fileRemove(fileId): void {
    // console.log(fileId);
    this.filesArray.splice(fileId, 1);
  }

  //file is upploaded from browse button
  fileFromInput(e): void {
    // console.log('file from input');
     // this.filesArray=[...e.target.files]
        // console.log("Target files",e.target.files,"type",Array.isArray(e.target.files))
        let i=this.filesArray.length-1
        for (var key in e.target.files) {
          if (e.target.files.hasOwnProperty(key)) {
              console.log(key + " -> " + e.target.files[key]);
              if(e.target.files[key].name.split('.').includes('jpg'))
              {
                  // alert("images are not allowed")
                  this.alertMsg="images are not allowed"
                  this.showAlert=true
                  break
              }
              else
              {
                this.filesArray.push(e.target.files[key])
              }
             
          }
          e.target.value = ''
      }

        // console.log("file Array",this.filesArray)
      if (this.filesArray.length > 0) {
        this.ShowFiles = true;
      }
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
  hideAlert():void
  {
      this.showAlert=false
  }
}
