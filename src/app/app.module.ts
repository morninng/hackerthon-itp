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
import { LessonLayoutComponent } from './lesson-layout/lesson-layout.component';
import { OpponentVideoComponent } from './opponent-video/opponent-video.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectionLayoutComponent,
    LessonLayoutComponent,
    OpponentVideoComponent
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
