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
  enter = false;
  upload = false;
  uploadImage = false;
  alignment = false;
  addLink = false;
  listStyle = false;
  filesArray: Array<object>[];
  ShowFiles: boolean;
  fontStyle = false;
  fillColor = false;
  setTextColor = false;
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
  }

  ngOnInit(): void {}

  buttonClicked(event: any): void {
    event.stopPropagation();
    if (
      event?.target?.dataset?.id === 'link' ||
      event?.target?.dataset?.id === 'attachment'
    ) {
    } else if (event?.target?.dataset) {
      this.buttonClick.emit(event?.target?.dataset);
    }
  }

  changeImage(event: any): void {
    console.log(event);
  }

  attachPopover(): void {
    this.filesArray = [];
    this.upload = !this.upload;
  }
  dragenter(e): void {
    e.preventDefault();
    e.stopPropagation();
    // this.filesArray.push(e.name);
    // console.log(this.filesArray)
    // this.filesArray.push(e.dataTransfer.files)
    // console.log(e.dataTransfer)
    // console.log(this.filesArray)
    this.enter = true;
  }
  dropFile(e): void {
    e && e.preventDefault();
    console.log('file drop');
    if (
      e.dataTransfer.files[0].name.includes('jpg') ||
      e.dataTransfer.files[0].name.includes('png') ||
      e.dataTransfer.files[0].name.includes('gif') ||
      e.dataTransfer.files[0].name.includes('svg')
    ) {
      alert('Image files are not allowed');
    } else {
      this.filesArray.push(e.dataTransfer.files[0]);
      console.log('on drop files array', this.filesArray);
      if (this.filesArray.length > 0) {
        this.ShowFiles = true;
      }
      // console.log("drop event",e)
    }
  }

  dropImage(e) {
    // console.log(e.t)
    this.imgArr.push(e.dataTransfer.files[0])
  }

  fileRemove(fileId): void {
    console.log(fileId);
    this.filesArray.splice(fileId, 1);
  }

  fileFromInput(e): void {
    console.log('file from input');
    // console.log(e.target.files)
    if (
      e.target.files[0].name.split('.').includes('jpg') ||
      e.target.files[0].name.split('.').includes('png') ||
      e.target.files[0].name.split('.').includes('gif') ||
      e.target.files[0].name.split('.').includes('svg')
    ) {
      alert('Image files are not allowed');
    } else {
      if(e.target.files.length>0)
      {
        // this.filesArray=[...e.target.files]
        console.log("Target files",e.target.files,"type",Array.isArray(e.target.files))
        let i=this.filesArray.length-1
        // e.target.files.forEach(element => {
        //   // console.log(element)
        //   this.filesArray.push(element)

        // });

        for (var key in e.target.files) {
          if (e.target.files.hasOwnProperty(key)) {
              console.log(key + " -> " + e.target.files[key]);
              this.filesArray.push(e.target.files[key])
          }
      }

        

        console.log("file Array",this.filesArray)

      }
      else{
        this.filesArray.push(e.target.files[0])
      }
      
      // [...e.target.files];
      if (this.filesArray.length > 0) {
        this.ShowFiles = true;
      }
      console.log('files Array', this.filesArray);
    }
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
    console.log('dragend');
    this.enter = false;
  }

  dragleave(e): void {
    console.log('dragleave');
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
  highlight(): void {
    this.fillColor = !this.fillColor;
  }
  textColor(): void {
    this.setTextColor = !this.setTextColor;
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
    this.fillColor = false;
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
  closeHighlitePopover(): void {
    this.fillColor = false;
  }
  closeTextColorPopover(): void {
    this.setTextColor = false;
  }
}
