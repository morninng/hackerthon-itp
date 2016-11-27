import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class FirebaseService {

  constructor(private af: AngularFire) { }

  update_firebase_data(reference, data){
    console.log("reference", reference);
    console.log("data", data);
    const item_ref = this.af.database.object(reference);
    const promise = item_ref.update(data);
    promise.then(()=>{
      console.log("success to save")})
    .catch((err)=>{
      console.log("fail to save")
    });

  }

  set_firebase_data(reference, data){
    console.log("reference", reference);
    console.log("data", data);
    const item_ref = this.af.database.object(reference);
    const promise = item_ref.set(data);
    promise.then(()=>{
      console.log("success to save")})
    .catch((err)=>{
      console.log("fail to save")
    });
  }

  push_obj(reference, obj){
    console.log("reference", reference);
    console.log("obj", obj);
    const item_ref = this.af.database.list(reference);
    const promise = item_ref.push(obj);
    promise.then(()=>{
      console.log("success to save")})
    .catch((err)=>{
      console.log("fail to save")
    });
  }

  remove_firebase_data(reference){

    const item_ref = this.af.database.object(reference);
    const promise = item_ref.remove();
    promise.then(()=>{
      console.log("success to remove")})
    .catch((err)=>{
      console.log("fail to remove")
    });
          
  }


  remove_audio_transcript(){
    this.remove_firebase_data("hackerthon-ipt/record/audio");
    this.remove_firebase_data("hackerthon-ipt/record/transcription");
  }
  

}
