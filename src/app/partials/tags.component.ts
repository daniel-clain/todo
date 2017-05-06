import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'tags-component',
  template: `
    <div class="tagsContainer">
      <div 
        class='tag generalBox' 
        *ngFor="let tag of taskService.tagsList" 
        (click)="tagSelected(tag.name)" 
        [ngClass]="{'active': selectedTags.indexOf(tag.name) >= 0}"
      >
        <div class='tagName' (click)="tagSelected(tag.name)">
          {{tag.name}}
        </div>
        <div class='centerAssist'></div>
      </div>
    </div>
  `
})
export class TagsComponent{  
  
  @Output() tagListUpdateSource = new EventEmitter();
  @Input() selectedTags=[];

  constructor(public taskService: TaskService) {}
      
  public tagSelected(tagName) {
      if(this.selectedTags.indexOf(tagName) >= 0) {
        this.selectedTags.splice(this.selectedTags.indexOf(tagName),1);
      } else {
        this.selectedTags.push(tagName);
      }
      this.tagListUpdateSource.emit(this.selectedTags);
  }
}
