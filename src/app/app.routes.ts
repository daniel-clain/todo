import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskComponent } from './task.component';
import { AllTasksComponent } from './allTasks.component';
import { SearchByTagComponent } from './searchByTag.component';
import { ManageTagsComponent } from './manageTags.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: 'new',  component: TaskComponent, },
  { path: 'edit/:id',  component: TaskComponent, },
  { path: 'all',  component: AllTasksComponent },
  { path: 'search',  component: SearchByTagComponent },
  { path: 'manage-tags', component: ManageTagsComponent },
  { path: '', redirectTo: '/new', pathMatch: 'full'}
  
];
