import { Component, OnInit, ElementRef } from '@angular/core';
import {Router} from '@angular/router'
import {SkywayService} from './../service/skyway.service'

@Component({
  selector: 'app-selection-layout',
  templateUrl: './selection-layout.component.html',
  styleUrls: ['./selection-layout.component.css']
})
export class SelectionLayoutComponent implements OnInit {

  _el;
  video_container
  own_user_subscription;

  constructor(private router: Router,
              private el: ElementRef,
              private skyway: SkywayService) { }

  ngOnInit() {
    this._el = this.el.nativeElement;
    this.skyway.initialize();
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

  join_as_teacher(){
    this.router.navigate(['/lesson']);
    this.skyway.join_room('itp_hackerson');
  }
  
  join_as_student(){
    this.router.navigate(['/lesson']);
    this.skyway.join_room('itp_hackerson');
  }


}
