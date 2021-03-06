import { Component,OnChanges,SimpleChanges } from '@angular/core';
import { nanoid } from './melo-mini-editor/nanoid';
// ChangeDetectionStrategy
import { EditorConfig } from 'marx-editor';
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
  modelvalue2: string = 'ascascascas';
  namesA = [{id: 12,  name: 'Step'},{id: 11,  name: 'Run'},{id: 13,  name: 'Touch'},{id: 14,  name: 'Feel'}]
  namesB = [{id: 1,  name: 'Coming'},{id: 3,  name: 'Maniac'},{id: 43,  name: 'Gross'},{id: 6,  name: 'Delivery'}]
  editorConfig1: EditorConfig = {
    // mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    // toolbarPlacement: 'bottom',
    buttonName: 'Submit',
    file: true,
    link: true,
    colorPalette: true,
    mode: 'prime',
<<<<<<< HEAD
    zIndex: 6666666,
    maxHeight: '500px',
    id: 'PLAGIARISM',
=======
    // id: 'PLAGIARISM',
>>>>>>> b9b9a217db5fdc7480a1382877a5947051a48bee
    configFontStyle: true,
    zIndex: 45555,
    // urlInputPlaceHolder: 'PLESS',
    // urlText: 'adsasdsad',
    // urlTitle: 'adsfeqgegwegwge',
    // urlValue: 'PIVOA',
    // validUrlMessage: 'asadsadqwdw ad',
  };
  

  editorConfig2: EditorConfig = {
    file: true,
    colorPalette: true,
    toolbarPlacement: 'bottom',
    configFontStyle: true,
    mode: 'prime',
    id:'khwaab',
    zIndex: 8999,
    link: true,
    placeholder: 'Please Add Some Text',
    buttonName: 'Upload',
    mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    mentionedDates: ['19-02-2020', '11-02-2020', '12-02-2020', '14-02-2020']
  };


  constructor() {
    setTimeout(()=>{
      this.modelvalue1 = Math.random().toString(36).replace('0.','Logging ?' || '');
    });

    // setInterval(()=>{
    //   this.editorConfig1.zIndex++;
    // }, 2000);


    setTimeout(()=>{
      this.editorConfig1.mentionedNames = this.namesA;
      this.editorConfig1 = {...this.editorConfig1};
    }, 7000);
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

  modelChange1(event) {
    console.log('EVENT1', event);
  }

  modelChange2(event) {
    console.log('EVENT2', event);
  }


  

  hello(): void {
    // console.log('HELLO3');
  }
}
