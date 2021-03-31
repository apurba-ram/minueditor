import { Component,OnChanges,SimpleChanges,Output,EventEmitter } from '@angular/core';
import { nanoid } from './melo-mini-editor/nanoid';
// ChangeDetectionStrategy
import { EditorConfig } from './melo-mini-editor/editor-config-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {
  @Output() myopen1 = new EventEmitter();
  filesFromChild:any[] = [];
  title = 'minieditor';
  defValue = 'jdi';
  modelvalue1 = null;
  modelvalue2: string = '';
  // namesA = [{id: 12,  name: 'Step'},{id: 11,  name: 'Run'},{id: 13,  name: 'Touch'},{id: 14,  name: 'Feel'}]
  // namesB = [{id: 1,  name: 'Coming'},{id: 3,  name: 'Maniac'},{id: 43,  name: 'Gross'},{id: 6,  name: 'Delivery'}]
  editorConfig1: EditorConfig = {
    mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    toolbarPlacement: 'bottom',
    buttonName: 'Submit',
    file: true,
    link: true,
    colorPalette: true,
    mode: 'prime',
    id: 'PLAGIARISM',
    configFontStyle: true,
    urlInputPlaceHolder: 'PLESS',
    urlText: 'adsasdsad',
    urlTitle: 'adsfeqgegwegwge',
    urlValue: 'PIVOA',
    validUrlMessage: 'asadsadqwdw ad',
    mentions:[
      {
        triggerChar:'$',
        maxItems:7,
        items:[
          {id:1,name:'prerna1'},
          {id:2,name:'prerna2'},
          {id:3,name:'prerna3'},
          {id:4,name:'megha'},
          {id:5,name:'chandi'},
          {id:6,name:'alec'},
          {id:7,name:'pravin'},
          {id:8,name:'satyendra'},
          {id:9,name:'gazia'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'}
        ]
      },
      {
        triggerChar:'*',
        items:[
          {id:11,name:'prerna4'},
          {id:22,name:'prerna5'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'}
        ]
      }
    ]
  };

  myopen(e:any)
  {
    console.log("OPEN EMIT ",e)
    this.myopen1.emit(e)
  }

  editorConfig2: EditorConfig = {
    file: true,
    colorPalette: true,
    toolbarPlacement: 'bottom',
    configFontStyle: true,
    mode: 'prime',
    id:'khwaab',
    link: true,
    placeholder: 'Please Add Some Text',
    buttonName: 'Upload',
    // mentionedNames: [{ id: 244 , name: 'Alec'}, { id: 560, name: 'Pappu'}, { id: 747, name: 'Joyce'}],
    // mentionedDates: ['19-02-2020', '11-02-2020', '12-02-2020', '14-02-2020'],
    mentions:[
      {
        triggerChar:'$',
        items:[
          {id:1,name:'prerna11'},
          {id:2,name:'prerna22'},
          {id:3,name:'prerna33'},
          {id:4,name:'megha2'},
          {id:5,name:'chandi22'},
          {id:6,name:'alec222'},
          {id:7,name:'pravin222'},
          {id:8,name:'satyendra222'},
          {id:9,name:'gazia222'},
          {id:33,name:'prerna6222'},
          {id:33,name:'prerna633'},
          {id:33,name:'prerna6333'},
          {id:33,name:'prerna633'}
        ]
      },
      {
        triggerChar:'*',
        items:[
          {id:11,name:'prerna44'},
          {id:22,name:'prerna54'},
          {id:33,name:'prerna64'},
          {id:33,name:'prerna62'},
          {id:33,name:'prerna26'},
          {id:33,name:'prerna61'},
          {id:33,name:'prerna116'},
          {id:33,name:'prerna2226'},
          {id:33,name:'prerna6aaa'},
          {id:33,name:'prerna6a'},
          {id:33,name:'prerna6sss'},
          {id:33,name:'prerna6ass'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'},
          {id:33,name:'prerna6'}
        ]
      }
    ]
  };


  constructor() {
    setTimeout(()=>{
      this.modelvalue1 = Math.random().toString(36).replace('0.','Logging ?' || '');
    });

    // setInterval(()=>{
    //   this.editorConfig1.id = nanoid();
    // }, 2000);


    // setTimeout(()=>{
    //   this.editorConfig1.mentionedNames = this.namesA;
    //   this.editorConfig1 = {...this.editorConfig1};
    // }, 7000);
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
