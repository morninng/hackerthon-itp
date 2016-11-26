import { Component, OnInit,Input, OnChanges, ElementRef, ChangeDetectorRef,
         NgZone  } from '@angular/core';

@Component({
  selector: 'app-opponent-video',
  templateUrl: './opponent-video.component.html',
  styleUrls: ['./opponent-video.component.css']
})
export class OpponentVideoComponent implements OnInit, OnChanges {

  @Input() stream_data
  stream_src;
  _el;

  constructor(private el: ElementRef,
            private change_ref: ChangeDetectorRef,
            private _ngZone: NgZone) { }

  ngOnInit() {
    this._el = this.el.nativeElement;
  }
  ngOnChanges() {
    console.log(this.stream_data);
    this.stream_src = null;
    if(!this.stream_data){
      this.remove_video_area();
    }else{
      for(var key in this.stream_data){
        this.stream_src = this.stream_data[key];
      }
      setTimeout(this.set_user_video, 1000);
    }

  }

  
  set_user_video = ()=>{
    this.remove_video_area();

    console.log("==video element is created with src== : ",this.stream_src);
    const video_container = this._el.getElementsByClassName("video_container")[0];
    const video_element = document.createElement("video");
    video_element.autoplay = true;
    video_element.src= this.stream_src
    video_element.width=100
    video_element.height=100



    video_container.insertBefore(video_element, null)
    console.log(video_element.src);
    this.change_ref.markForCheck();

    this._ngZone.run(()=>{});
  }


  remove_video_area = ()=>{
    const video_container = this._el.getElementsByClassName("video_container")[0];
    if(video_container){
      video_container.innerHTML = "";
    }
  }

}
