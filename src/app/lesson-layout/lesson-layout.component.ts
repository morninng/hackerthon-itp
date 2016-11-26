import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {SkywayService} from './../service/skyway.service'

import {RecognitionService} from './../service/recognition.service'
import { AngularFire } from 'angularfire2';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-lesson-layout',
  templateUrl: './lesson-layout.component.html',
  styleUrls: ['./lesson-layout.component.css']
})

export class LessonLayoutComponent implements OnInit {


  room_users = [];
  stream_data={};
  lesson_data={};
  participate_type = null;

  constructor(private skyway: SkywayService,
              private change_ref: ChangeDetectorRef,
              private recognition: RecognitionService,
              private af: AngularFire,
              private route: ActivatedRoute,) { }

  ngOnInit() {

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


    const item = this.af.database.object('/hackerthon-ipt/', { preserveSnapshot: true });
    item.subscribe((snapshot)=>{
      this.lesson_data = snapshot.val() || {};
      console.log(this.lesson_data);
    })

    
  }

}
