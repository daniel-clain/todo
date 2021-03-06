import { Component, OnInit, Input, Output  } from '@angular/core';
import { TaskService } from './task.service';
import {
  Router, ActivatedRoute, Params,
  RouterModule,
  PreloadAllModules
} from '@angular/router';


@Component({
    selector: 'task',
    template: `
        <h1>{{pageTitle}}</h1>

        <textarea class="generalBox" *ngIf='subView === "copy"' [(ngModel)]="this.taskService.activeTask.copy"></textarea>
        <div *ngIf='subView === "tags"'>
            <tags-partial (tagSelectedOutput)="tagSelected($event)" [selectedTagsInput]="selectedTags"></tags-partial>
        </div>

        <button class="buttonStyle saveButton" (click)='save(textArea)'>Save</button>
        <button class="buttonStyle saveButton" (click)='subView="tags" '>Tags</button>
        <button class="buttonStyle saveButton" (click)='subView="copy"'>Text</button>
    `
})

export class TaskComponent implements OnInit {
    pageTitle = 'New Task';
    subView='copy';
    selectedTags = [];
   

    constructor(
        public taskService: TaskService,
        public route: ActivatedRoute, 
        public router: Router
    ) {}

    ngOnInit(){
        this.route.params.subscribe((params: Params) => {
            this.subView='copy'
            if(params.id === undefined) {
                this.pageTitle="New Task";
                this.selectedTags = [];
                this.taskService.activeTask = {
                    id: new Date().valueOf(),
                    copy: '',
                    tags: []
                }
            } else {           
                this.pageTitle="Edit Task";
                this.loadEditTask(parseInt(params.id));
            }
        });
    }

    tagSelected(tag){
        if(this.selectedTags.indexOf(tag.name) >= 0) {
            this.selectedTags.splice(this.selectedTags.indexOf(tag.name),1);
        } else {
            this.selectedTags.push(tag.name);
        }      
    }

    tagListUpdate(updatedList){
        console.log('shazam: ', updatedList);
        this.selectedTags = updatedList;
    }

    public save() {
        let addNew = false;
        let items = this.taskService.rootObj.items;
        for(let i=0;i<items.length;i++) {
            if(items[i].id === this.taskService.activeTask.id) {
                addNew=false;
                this.taskService.rootObj.items[i] = this.taskService.activeTask;
                break;
            } else {
                addNew=true
            }
        }  
        if(addNew){
            this.taskService.rootObj.items.unshift(this.taskService.activeTask)
        }  
        if(this.taskService.production){
            this.taskService.saveRootObject().subscribe(
                (success) => console.log(success),
                (error) => console.log(error));
        }

        this.router.navigate(['/edit',this.taskService.activeTask.id]);
    }

    public loadEditTask(id) {
        let items = this.taskService.rootObj.items;
        for(let i=0;i<items.length;i++){
            if(items[i].id === id) {     
                this.taskService.activeTask = items[i];
            }
        }
    }


}
