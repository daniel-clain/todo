import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  Router, ActivatedRoute, Params,
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { TaskComponent } from './task.component';
import { TaskService } from './task.service';
import { AllTasksComponent } from './allTasks.component';
import { SearchByTagComponent } from './searchByTag.component';
import { ManageTagsComponent } from './manageTags.component';

// Pipes
import { OrderPipe } from './pipes/order.pipe';
import { SearchPipe } from './pipes/search.pipe';

// Partials
import { ToolBarComponent } from './partials/toolBar.component'
import { TagsComponent } from './partials/tags.component';


import '../styles/styles.scss';
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    TaskComponent,
    AllTasksComponent,
    SearchByTagComponent,
    ManageTagsComponent,
    OrderPipe,SearchPipe,
    ToolBarComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [TaskService]
})
export class AppModule {}
