import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'search-by-tag-component',
  templateUrl: './templates/searchByTag.component.html'
})
export class SearchByTagComponent implements OnInit {
  
  items;
  itemsIds = [];
  secondClick=false;
  selectedTags = [];
  timer;
  deleteActiveIndex;
  newItemsList;
  toolList = ['search-component'];
  searchVal;

  constructor(public taskService: TaskService, private router: Router) {}
  public ngOnInit() {
  }
  
  public tagSelected(tag) {
      if(this.selectedTags.indexOf(tag.name) >= 0) {
        this.selectedTags.splice(this.selectedTags.indexOf(tag.name),1)
      } else {
        this.selectedTags.push(tag.name);
      }
      if(this.selectedTags.length !== 0) {
        this.filterItems();
      } else {
        this.items=[];
        this.itemsIds=[];
      }
  }

  public filterItems() {
    this.newItemsList = [];
    this.itemsIds=[];
    let items = this.taskService.rootObj.items;
    for(let i=0;i<items.length;i++){
      this.checkWhichTasksHaveTheHightlightedTags(items[i]);
    }
    this.items = this.newItemsList;
  }

  checkWhichTasksHaveTheHightlightedTags(item) {
    let foundAll = true;
    for( let k=0;k<this.selectedTags.length;k++) {
      if(item.tags.indexOf(this.selectedTags[k]) === -1) {
        foundAll = false;
        break;
      }
    }
    if(foundAll) {
      if(this.itemsIds.indexOf(item.id) === -1) {
        this.newItemsList.push(item);
        this.itemsIds.push(item.id);
      }
    } else {
      if(this.itemsIds.indexOf(item.id) === -1) {
        for(let j=0;j<this.newItemsList.length;j++) {
          if(this.newItemsList[j].id === item.id) {
            this.itemsIds.splice(this.itemsIds.indexOf(item.id),1);
            delete this.newItemsList[j];
          }
        }
      }
    }
  }

  public openTask(id) {
    this.router.navigate(['/edit',id]);
  }

  public deleteClicked(e,id,index) {
    e.stopPropagation();
    this.deleteActiveIndex = index;
    if(this.secondClick){
      clearTimeout(this.timer);
      this.secondClick = false;
      this.deleteActiveIndex = -1;
      this.taskService.deleteToArchive(id);
      this.filterItems();

    } else {
      this.secondClick = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.threeSecondDeactivate(), 3000);
    }
    
  }
  public threeSecondDeactivate() {
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
