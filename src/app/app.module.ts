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


import { AngularFireModule, AuthProviders, AuthMethods, } from 'angularfire2';
import { OwnVideoComponent } from './own-video/own-video.component';

const firebaseConfig = {
    apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
    authDomain: "mixidea-91a20.firebaseapp.com",
    databaseURL: "https://mixidea-91a20.firebaseio.com",
    storageBucket: "mixidea-91a20.appspot.com",
    messagingSenderId: "46563705700"
  };




@NgModule({
  declarations: [
    AppComponent,
    SelectionLayoutComponent,
    LessonLayoutComponent,
    OpponentVideoComponent,
    OwnVideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
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
