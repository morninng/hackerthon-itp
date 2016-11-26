import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'


@Component({
  selector: 'app-selection-layout',
  templateUrl: './selection-layout.component.html',
  styleUrls: ['./selection-layout.component.css']
})
export class SelectionLayoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  join_as_teacher(){
    this.router.navigate(['/teacher']);
  }
  
  join_as_student(){
    this.router.navigate(['/student']);
  }


}
