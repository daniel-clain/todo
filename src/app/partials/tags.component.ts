import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'tags-partial',
  template: `
  
    <div 
      class='tag generalBox' 
      *ngFor="let tag of taskService.tagsList" 
      (click)="tagSelected(tag)" 
      [ngClass]="{'active': selectedTagsInput.indexOf(tag.name) >= 0}"
    >
      <color-dot-partial [colorsArray]=[tag.color]></color-dot-partial>
      <div class='tagName'>
        {{tag.name}}
      </div>
      <div class='centerAssist'></div>
    </div>
  
  `
})
export class TagsComponent{  
  
  @Output() tagSelectedOutput = new EventEmitter();
  @Input() selectedTagsInput;

  

  constructor(public taskService: TaskService) {}
      
  public tagSelected(tag) {
    this.tagSelectedOutput.emit(tag);
  }
}
