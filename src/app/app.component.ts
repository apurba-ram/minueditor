import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'minieditor';
  defValue = 'jdi';
  modelvalue = '';
  editorConfig = {
    file: true,
    mentionedNames: [{ _id: 'asd', name: 'Alec'}, { _id: 'asg5d', name: 'Pappu'}, { _id: 'asdqq', name: 'Joyce'}],
    mentionedDates: ['19-02-2020', '11-02-2020', '12-02-2020', '14-02-2020'],
    buttonName: 'Comment',
    fontColor: true,
    highlightColor: true
  };
}
