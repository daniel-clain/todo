import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'manage-tags-component',
  template: `
    <tags-partial (tagSelectedOutput)="tagSelected($event)" [selectedTagsInput]="selectedTags"></tags-partial>
    <div class="manageTasksControls" *ngIf="selectedTags.length > 0">
      <input class="generalBox" [(ngModel)]='selectedTag.name' placeholder="Tag Name" />
      <input class="generalBox" [(ngModel)]='selectedTag.color' type="color" />
    </div>

    <button class="buttonStyle saveButton" (click)='newTag()'>New Tag</button>
    <button class="buttonStyle saveButton" (click)='saveTagList()'>Save All Changes</button>
  `
})
export class ManageTagsComponent implements OnInit {
  
  tagsList;
  selectedTags = [];
  selectedTag = {}

  constructor(public taskService: TaskService) {}
  public ngOnInit() {
    this.selectedTags = []
    this.selectedTag = {};
  }
  
  public tagSelected(tag){
    if(this.selectedTags.indexOf(tag.name) >= 0) {
      this.selectedTags = []
      this.selectedTag = {};
    } else {
      this.selectedTag = tag;
      this.selectedTags= [tag.name];
    }
  }

  public saveTagList() {
    this.taskService.updateTagsObject(this.tagsList).subscribe(
      (success) => console.log(success),
      (error) => console.log(error));
  }
  
  public newTag(){

    this.taskService.tagsList.push({name:''})
    let tag = this.taskService.tagsList[this.taskService.tagsList.length-1]
    this.selectedTags = [tag.name];
    this.selectedTag = tag;
  }
  
}
