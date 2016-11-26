import { Injectable } from '@angular/core';
import { Http }    from '@angular/http';
import {FirebaseService} from './firebase.service';

declare var window:any;

@Injectable()
export class RecognitionService {

  private under_recording = false;
  private available = true;
  private recognition = null;
  private speech_start_time : number;
  private transcription_ref = null;
  private target_lang = null;
  private audio_start_time = 0;

  private translation_server_url = "https://recording.mixidea.org:3000/translate"

  constructor(private firebase: FirebaseService,
              private http: Http) { }


  initialize(participate_type){
    console.log("recognition initialization")
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!window.SpeechRecognition){
      this.available = false;
      return;
    }
    this.recognition = new window.SpeechRecognition();
    this.recognition.continuous = true;
    if(participate_type=="student"){
      this.recognition.lang = "en";
      this.target_lang = 'en';

    }else if(participate_type=="teacher"){
      this.recognition.lang = "en";
      this.target_lang = 'en';
    }
    

    this.recognition.onresult = (e)=>{
      const results = e.results;
      for(let i = e.resultIndex; i<results.length; i++){
        if(results[i].isFinal){
          const transcripted_sentence = results[i][0].transcript;
          console.log(transcripted_sentence);
          this.execute_with_transcription(transcripted_sentence);
        }
      }
    };
    //this.transcription_ref = "/hackerthon-ipt/" + participate_type;
    this.transcription_ref = "/hackerthon-ipt/record/";
    //this.start();
  }


  start(){
    if(!this.available){
      return;
    };
    if(this.under_recording){
      return;
    }else{
      console.log("--recognition start--");
      this.audio_start_time = new Date().getTime();
      this.recognition.start();
      this.under_recording = true;
    }

  }


  stop(){
    if(!this.available || !this.under_recording){
      return;
    }
    setTimeout(
      ()=>{
        console.log("--recognition stop--");
        this.recognition.stop();
        this.under_recording = false;
      }
    ,1000);
  }


  execute_with_transcription(text){
      this.StoreData(text);
      //this.translation(text);
  }

  StoreData(text){
      const current_time = new Date().getTime();
      const audio_time = current_time - this.audio_start_time;
      const transcription_context_ref = this.transcription_ref + "/transcription/" + audio_time;
      this.firebase.set_firebase_data(transcription_context_ref, text);
  }


/*
  translation(text){

    const translation_ref = this.transcription_ref + "/translate/" + this.target_lang;


    const req_url =
     this.translation_server_url +
      "?text=" + text + 
      "&target_lang=" + this.target_lang + 
      "&firebase_ref=" + translation_ref;
    
    this.http.get(req_url)
      .toPromise()
      .then((response) => {console.log(response)})
      .catch((err)=>{
        console.log(err);
      });
  }
*/
}
