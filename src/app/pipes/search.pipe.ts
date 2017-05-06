import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})

export class SearchPipe implements PipeTransform {
  transform(items, searchVal: String) {
    let tempArray=[]

    if(!items) return tempArray;

    if(!searchVal || searchVal==='') return items;

    for(var item of items){
        if((item.copy.toLowerCase()).includes((searchVal.toLowerCase())))tempArray.push(item);
    }
    return tempArray;
  }
}