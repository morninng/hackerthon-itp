import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router'
import {SkywayService} from './../service/skyway.service'

import {RecognitionService} from './../service/recognition.service'

@Component({
  selector: 'app-selection-layout',
  templateUrl: './selection-layout.component.html',
  styleUrls: ['./selection-layout.component.css']
})
export class SelectionLayoutComponent implements OnInit {


  
  own_user_subscription;

  constructor(private router: Router,
              private skyway: SkywayService,
              private recognition: RecognitionService) { }

  ngOnInit() {
    
    this.skyway.initialize();
  }


  join_as_teacher(){
    let navigationExtras: NavigationExtras = {
      queryParams: { 'participate_type': "teacher" }
    };
    this.router.navigate(['/lesson'], navigationExtras);
    this.skyway.join_room('itp_hackerson');
  }

  join_as_student(){

    let navigationExtras: NavigationExtras = {
      queryParams: { 'participate_type': "student" }
    };
    this.router.navigate(['/lesson'], navigationExtras);
    this.skyway.join_room('itp_hackerson');
  }


}
