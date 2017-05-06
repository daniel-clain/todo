/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app',
  template: `
    <main class="clearfix">
      <nav>
        <a [routerLink]=" ['./new'] "
          class="buttonStyle"
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          New
        </a>
        <a [routerLink]=" ['./manage-tags'] "
          class="buttonStyle"
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Manage Tags
        </a>
        <a [routerLink]=" ['./search'] "
          class="buttonStyle"
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Search By Tag
        </a>
        <a [routerLink]=" ['./all'] "
          class="buttonStyle"
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          View All
        </a>
      </nav>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  constructor(public taskService: TaskService) {}
    public ngOnInit() {
        this.taskService.getRootObject();
    }
}
