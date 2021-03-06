import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    // console.log("items",items)
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      // console.log("IOJURH",it)
      // console.log("TYPE",typeof(it.name,it.type))
       return (it.name.includes(searchText) );
    });


    
  }

}
