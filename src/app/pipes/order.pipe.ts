import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'order'})

export class OrderPipe implements PipeTransform {
  transform(items: object, order: string): object {
    console.log(items)
    console.log(order)
    return {name:"penis"}
  }
}