import { Component, OnInit, ElementRef } from '@angular/core';

import {SkywayService} from './../service/skyway.service'


@Component({
  selector: 'app-own-video',
  templateUrl: './own-video.component.html',
  styleUrls: ['./own-video.component.css']
})
export class OwnVideoComponent implements OnInit {

  video_container
  _el;
  constructor(private skyway: SkywayService,
              private el: ElementRef) { }

  ngOnInit() {
    this._el = this.el.nativeElement;
  }

  ngAfterViewInit(){

    this.skyway.local_video_stream_subject.subscribe((stream)=>{
      console.log("local video stream subscription");
      if(stream){
        this.video_container = this._el.getElementsByClassName("own_video")[0];
        this.video_container.innerHTML = "";
        const video_element = document.createElement("video");
        video_element.autoplay = true;
        video_element.src= window.URL.createObjectURL(stream);
        video_element.muted = true; //own voice is heard when enveironment is checked.
        this.video_container.insertBefore(video_element, null)
        console.log(video_element.src);
      }
    })
  }










}
