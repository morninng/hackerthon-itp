import { Component, OnInit,ChangeDetectorRef,ElementRef, NgZone } from '@angular/core';
import {SkywayService} from './../service/skyway.service'

import {RecognitionService} from './../service/recognition.service'
import { AngularFire,  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {RecordingService} from './../service/recording.service'

@Component({
  selector: 'app-lesson-layout',
  templateUrl: './lesson-layout.component.html',
  styleUrls: ['./lesson-layout.component.css']
})

export class LessonLayoutComponent implements OnInit {


  room_users = [];
  stream_data={};
  record : any={};
  lesson_data : any ={};
  audio_src  = null;
  participate_type = null;
  _el
  transcription_data = {};
  transcript_item: FirebaseListObservable<any>;

  audio_element;
  audio_play_time

  constructor(private skyway: SkywayService,
              private change_ref: ChangeDetectorRef,
              private recognition: RecognitionService,
              private af: AngularFire,
              private route: ActivatedRoute,
              private recording: RecordingService,
              private el: ElementRef,
              private _ngZone: NgZone) { }

  ngOnInit() {

    this._el = this.el.nativeElement;

    this.route.queryParams.map(
        (params)=>{
            return params['participate_type'] || null
        }).subscribe((value)=>{
          this.participate_type = value;
          this.recognition.initialize(this.participate_type);
        })

    this.skyway.room_data_subject.subscribe((room_data)=>{
      console.log("room data is updated", room_data)
      this.room_users = room_data.room_users || [];
      this.stream_data = room_data.stream_data || {};
      this.change_ref.markForCheck();
    })


    const audio_item = this.af.database.object('/hackerthon-ipt/record/audio', { preserveSnapshot: true });
    audio_item.subscribe((snapshot)=>{
      // this.lesson_data = snapshot.val() || {};
      // console.log('lesson data', this.lesson_data);
      // this.record = this.lesson_data.record || {};
      const new_audio_src = snapshot.val();
      if(new_audio_src !=this.audio_src && new_audio_src){
        setTimeout(()=>{
          this.set_audio_file();
        },500)
      }
      this.audio_src = new_audio_src;

      //this.transcription_data = this.record.transcription
    })

    this.transcript_item = this.af.database.list('/hackerthon-ipt/record/transcription');


    this.recording.initialize();
  }



  set_audio_file(){
    if(!this.audio_src ){
      return;
    }
    console.log("==audio element is created with src== : ",this.audio_src);
    const audio_container = this._el.getElementsByClassName("audio_container")[0];
    this.audio_element = document.createElement("audio");
    this.audio_element.controls = true;
    this.audio_element.src= this.audio_src;

    this.audio_element.addEventListener("play", ()=>{ this.audio_time_update(); });
    this.audio_element.addEventListener("seeked", ()=>{ this.audio_time_update(); });
    this.audio_element.addEventListener("timeupdate", ()=>{ this.audio_time_update(); });
    audio_container.insertBefore(this.audio_element, null)
    this.change_ref.markForCheck();
    this._ngZone.run(()=>{});
  }

  audio_time_update(){
    this.audio_play_time = Math.round(this.audio_element.currentTime * 1000);
    console.log("audio play time update", this.audio_play_time);
    this.change_ref.markForCheck();
  }

  click_audiosentence(value){
    console.log(value);
    this.audio_element.currentTime = value/1000;
    this.audio_element.play();
  }
  


  start_record(){
    this.recording.record_start();
    this.recognition.start();
  }
  stop_record(){
    this.recording.record_finish();
    this.recognition.stop();
  }

}
