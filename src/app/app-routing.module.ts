import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectionLayoutComponent } from './selection-layout/selection-layout.component';
import { LessonLayoutComponent } from './lesson-layout/lesson-layout.component';



const routes: Routes = [
  { path: '', redirectTo: '/select_role', pathMatch: 'full' },
  { path: 'select_role',  component: SelectionLayoutComponent },
  { path: 'lesson',  component: LessonLayoutComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
