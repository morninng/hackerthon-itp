import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import { SelectionLayoutComponent } from './selection-layout/selection-layout.component';
import { TeacherLayoutComponent } from './teacher-layout/teacher-layout.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionLayoutComponent,
    TeacherLayoutComponent,
    StudentLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
