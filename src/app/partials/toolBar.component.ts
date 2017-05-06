import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'tool-bar-partial',
  template: `
    <div class="toolBarContainer" *ngIf="tools">
        <div class="tool" *ngFor="let tool of tools">
            <input class="generalBox" [(ngModel)]="searchVal" (ngModelChange)="valueChange()" >
        </div>      
    </div>
  `
})
export class ToolBarComponent{ 
    private searchVal;
    @Input() private tools;
    @Output() private toolBarReturnList = new EventEmitter();

    private valueChange() {
        this.toolBarReturnList.emit([{name:'search', val:this.searchVal}]);
    }
}
