import { NotesDataService } from './../../services/notes-data/notes-data.service';
import { NotesApiService } from './../../services/notes-api/notes-api.service';
import { EventEmitter, HostListener, ViewChild } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from  '@angular/forms';

@Component({
    selector: 'note',
    templateUrl: 'note.component.html'
})

export class NoteComponent implements OnInit {

    // Holds an empty new note instance passed from 'Home Componenet
    @Input() note; 
    
    //Triggered when 'X' is clicked or 'Esc Button' pressed in Note Component. 
    //This event is propagated to 'Home' and is handled there to hide the Note Component
    @Output() closeNoteModalEvent = new EventEmitter();

    @Output() updateNoteEvent = new EventEmitter();

    @ViewChild('focus') vcInput; 

    noteForm : FormGroup;
    defaultTitle: string;
    disableSubmit = false;
    alert;
    isLoading;

    
    constructor
    (   
        private formBuilder : FormBuilder,
        private notesAPIService : NotesApiService,
        private noteDataService : NotesDataService
    ) 
    {

    }

    ngOnInit() {
        this.defaultTitle = 'Title';
        this.alert = {};
        this.isLoading = false;
        
        this.noteForm = this.formBuilder.group({
            'title':[this.note.title ? this.note.title : ''],
            'content':[this.note.content ? this.note.content : '', Validators.required],
            'cat':[this.note.cat ? this.note.cat : 'General'],
            'timestamp':[this.note.timestamp],
            'note_id':[this.note.note_id]
        });       
     }

     ngAfterContentInit()
     {
         this.vcInput.nativeElement.focus();
     }

     onCloseNoteModal($event?)
     {         
         this.closeNoteModalEvent.emit();
     }

     @HostListener('document:keydown', ['$event'])
     handleKeyboardEvent(event:KeyboardEvent){
         if(event.keyCode == 27){
             this.closeNoteModalEvent.emit();
         }
     }

     onSubmit(){
       
        this.disableSubmit = true;
        this.isLoading = true;

        if(!this.noteForm.value.timestamp)
        {
            //Add Note
            //Add Note in the DB via REST API and call the announceAddNote to update the Observable with newly added Note
            this.notesAPIService.addNote(this.noteForm.value).subscribe(
            note => {
              this.noteDataService.announceAddNote(note);
            },
            err => {
              if (err.error && err.error.message) {
                  this.alert = {
                      type: 'danger',
                      message: err.error.message
                  }
              } else {
                  this.alert = {
                      type: 'danger',
                      message: err.message
                  }
              }
              this.disableSubmit = false;
              this.isLoading = false;
            },
            //On Complete
            ()=>{
              this.onCloseNoteModal();
            }  
          );
        }
        else
        {
            //update Note
            this.notesAPIService.updateNote(this.noteForm.value).subscribe(

                note =>{
                    this.updateNoteEvent.emit(note);
                },
                err=>
                {
                    if (err.error && err.error.message) {
                        this.alert = {
                            type: 'danger',
                            message: err.error.message
                        }
                    } else {
                        this.alert = {
                            type: 'danger',
                            message: err.message
                        }
                    }

                    this.disableSubmit = false;
                    this.isLoading = false;
                },
                ()=>
                {
                    this.onCloseNoteModal();
                }

            );
        }

    }
}