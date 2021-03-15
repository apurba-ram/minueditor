import { Component,OnChanges,SimpleChanges } from '@angular/core';
// ChangeDetectionStrategy
import { EditorConfig } from './melo-mini-editor/editor-config-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {
  
  filesFromChild:any[] = [];
  title = 'minieditor';
  defValue = 'jdi';
  modelvalue1 = null;
  modelvalue2: string = '';
  namesA = [{id: 12,  name: 'Step'},{id: 11,  name: 'Run'},{id: 13,  name: 'Touch'},{id: 14,  name: 'Feel'}]
  namesB = [{id: 1,  name: 'Coming'},{id: 3,  name: 'Maniac'},{id: 43,  name: 'Gross'},{id: 6,  name: 'Delivery'}]
  editorConfig1: EditorConfig = {
    id: 'alleluiah',
    mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    toolbarPlacement: 'bottom',
    buttonName: 'Submit',
    file: true,
    popupZIndex: 6,
    link: true,
    colorPalette: true,
    mode: 'prime',
    strikeThrough:false,
    urlValue:"URL",
    urlText:'Display text',
    urlTitle:'Title',
    validUrlMsg:'Please provide a valid URL.',
    urlInputPlaceHolder:'Enter a URL (Example: https://example.com)',
    textInputPlaceHolder:'Enter a display text',
    titlePlaceholder:'Enter a title'
  };
  

  editorConfig2: EditorConfig = {
    file: true,
    colorPalette: true,
    toolbarPlacement: 'bottom',
    mode: 'prime',
    id:'khwaab',
    placeholder: 'Please Add Some Text',
    buttonName: 'Upload',
    mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    mentionedDates: ['19-02-2020', '11-02-2020', '12-02-2020', '14-02-2020']
  };


  constructor() {
<<<<<<< HEAD
    setTimeout(()=>{
      this.modelvalue2 = Math.random().toString(36).replace('0.','Logging ?' || '');
    });

    setTimeout(()=>{
      this.editorConfig1.mentionedNames = this.namesA;
      this.editorConfig1 = {...this.editorConfig1};
    }, 7000);
=======
    // setTimeout(()=>{
    //   this.modelvalue2 = Math.random().toString(36).replace('0.','Logging ?' || '');
    // }, 3000);
>>>>>>> b1a83319120af63ce22dc9b16274a9931b2f4ca2
  }
  
  

//from menu to container
filesSaved(event: any[]) {
  this.filesFromChild = [...this.filesFromChild, ...event];
  console.log('FILES');
  console.log(this.filesFromChild);
}

comment(event: string): void {
  console.log('COMMENT');
  console.log(event);
}


  

  hello(): void {
    // console.log('HELLO3');
  }
}
