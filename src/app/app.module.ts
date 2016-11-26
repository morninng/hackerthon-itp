import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }     from './app-routing.module';

import {FirebaseService} from './service/firebase.service';
import {RecognitionService} from './service/recognition.service';
import {RecordingService} from './service/recording.service';
import {SkywayService} from './service/skyway.service';
import {SocketstreamService} from './service/socketstream.service';

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
  providers: [
    FirebaseService,
    RecognitionService,
    RecordingService,
    SkywayService,
    SocketstreamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
