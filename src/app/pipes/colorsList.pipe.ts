import { Pipe, PipeTransform } from '@angular/core';
import { TaskService } from '../task.service';
@Pipe({name: 'colorsList'})

export class ColorsListPipe implements PipeTransform {
  constructor(public taskService: TaskService) {}
  transform(itemTagsList) {
    
    let colorsList=[]

    for(let tag of this.taskService.tagsList) {
      if(itemTagsList.indexOf(tag.name) >= 0) {
        console.log('~~~~item tags: ',itemTagsList)
        if(!tag.color || tag.color===""){
          tag.color="#ffffff"
        }
        if(tag.color==="#ffffff" || colorsList.indexOf(tag.color) < 0) {
          colorsList.push(tag.color);
        }
      }
    }
    console.log(colorsList)
    return colorsList
  }
}