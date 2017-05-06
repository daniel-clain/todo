import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'manage-tags-component',
  template: `
    <div class="tagsContainer">
      <div class='tag generalBox' *ngFor="let tag of tagsList" (click)="tagSelected(tag)" [ngClass]="{'active': selectedTag !== undefined && selectedTag.name === tag.name}">
        <div class='tagName' (click)="tagSelected(tag)">
          {{tag.name}}
        </div>
        <div class='centerAssist'></div>
      </div>
    </div>
    <input class="generalBox" [(ngModel)]='selectedTag.name' />
    <button class="buttonStyle saveButton" (click)='newTag()'>New Tag</button>
    <button class="buttonStyle saveButton" (click)='reset()'>Reset Changes</button>
    <button class="buttonStyle saveButton" (click)='saveTagList()'>Save All Changes</button>
  `
})
export class ManageTagsComponent implements OnInit {
  
  tagsList;
  selectedTag={name:''};

  constructor(public taskService: TaskService) {}
  public ngOnInit() {
      this.reset()
  }
  
  public tagSelected(tag){
      this.selectedTag = tag
  }

  public saveTagList(){    
    this.taskService.updateTagsObject(this.tagsList).subscribe(
      (success) => console.log(success),
      (error) => console.log(error));

  }
  public reset(){
    this.tagsList = this.taskService.tagsList;
  }

  
  public newTag(){
    this.taskService.tagsList.push({name:''})
    this.selectedTag = this.tagsList[this.tagsList.length-1];
  }
  
}
