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
  editorConfig1: EditorConfig = {
    id: 'alleluiah',
    mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    mentionedDates: ['19-02-2020', '11-02-2020', '12-02-2020', '14-02-2020'],
    toolbarPlacement: 'bottom',
    buttonName: 'Submit',
    file: true,
    popupZIndex: 6,
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
    // setTimeout(()=>{
    //   this.modelvalue2 = Math.random().toString(36).replace('0.','Logging ?' || '');
    // }, 3000);
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
