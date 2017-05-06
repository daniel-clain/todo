import { Component } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'task',
    template: `
        <h1>All Tasks</h1>
        <div class='allTasksList' *ngIf='taskService.rootObj !== undefined'>
            <tool-bar-partial [tools]='toolList' (toolBarReturnList)="toolBarReturnHandler($event)"></tool-bar-partial>
            <div class='generalBox listItem' *ngFor='let item of taskService.rootObj.items | search: searchVal; let i = index; trackBy: i' (click)='openTask(item.id)'>
                <color-dot-partial [colorsArray]="item.tags | colorsList"></color-dot-partial>
                <span [innerHtml]="item.copy"></span>
                <span [ngClass]="{'deleteActive':secondClick && deleteActiveIndex === i}" class="deleteButton" (click)="deleteClicked($event, item.id, i)"></span>
            </div>
        </div>
    `
})

export class AllTasksComponent {

    secondClick=false;
    timer;
    deleteActiveIndex;
    searchVal
    toolList=['search-component'];

    constructor(public taskService: TaskService, private router: Router) {}

    public openTask(id){
        this.router.navigate(['/edit',id]);
    }

    public deleteClicked(e,id,index){
    e.stopPropagation();
    this.deleteActiveIndex = index;
    if(this.secondClick){
      clearTimeout(this.timer);   
      this.secondClick = false;
      this.deleteActiveIndex = -1; 
      this.taskService.deleteToArchive(id)      

    }else{
      this.secondClick = true
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.threeSecondDeactivate(), 3000);
    }
    
  }
  public threeSecondDeactivate(){
      this.secondClick = false;
      this.deleteActiveIndex = -1;
      
  }
  public toolBarReturnHandler(toolsList) {
    for(let tool of toolsList) {
      if(tool.name === 'search') {
          this.searchVal = tool.val;
      }
    }
  }
}
