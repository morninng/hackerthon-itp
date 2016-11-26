import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectionLayoutComponent } from './selection-layout/selection-layout.component';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';



const routes: Routes = [
  { path: '', redirectTo: '/select_role', pathMatch: 'full' },
  { path: 'select_role',  component: SelectionLayoutComponent },
  { path: 'teacher',  component: TeacherLayoutComponent },
  { path: 'student',  component: StudentLayoutComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
