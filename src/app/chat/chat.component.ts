import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {FirebaseListObservable, AngularFire} from 'angularfire2'

import {FirebaseService} from './../service/firebase.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  own_participate_type = null;
  chat_items : FirebaseListObservable<any>;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService,
    private af : AngularFire
  ) {}

  ngOnInit() {

    this.route.queryParams.map(
        (params)=>{
            return params['participate_type'] || null
        }).subscribe((value)=>{
          this.own_participate_type = value;
        })

    this.chat_items = this.af.database.list('hackerthon-ipt/record/chat');

  }
  model = new text_class()

  send_message(){

    const chat_sentence = {
      participate_type : this.own_participate_type,
      context: this.model.context
    }
    this.firebase.push_obj('hackerthon-ipt/record/chat', chat_sentence);
    this.model.context = "";

  }



}


class text_class{
  context = "";
}