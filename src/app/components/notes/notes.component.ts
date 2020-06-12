import { NotesDataService } from './../../services/notes-data/notes-data.service';
import { NotesApiService } from './../../services/notes-api/notes-api.service';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";

@Component({
    selector: 'notes',
    templateUrl: 'notes.component.html'
})

export class NotesComponent implements OnInit {
    
    userNotes: any[];
    alert;
    startKey: any;
    noNotesFound: boolean;
    isListLoading;
    AddNoteSubscription;
    selectedNote;
    showNote = false;
    isLoading;
        
    constructor
    (
        private notesAPIService : NotesApiService,
        private notesDataService : NotesDataService

    ) { }

    ngOnInit() {
        this.alert = {};
        this.isListLoading = false;

        this.refreshNotes();

        //Subcribe to addNote$ observable
        this.AddNoteSubscription = this.notesDataService.addNote$.subscribe(
            (note) =>{
                this.addNote(note);
            }
        );

     }

     refreshNotes(){

        this.userNotes = [];
        this.isLoading = true;
        this.notesAPIService.getNotes().subscribe(
            res => {
                let data = res;
                if(_.has(res, 'LastEvaluatedKey')){
                    this.startKey = res.LastEvaluatedKey.timestamp;
                }
                else
                {
                    this.startKey = 0;
                }

                if(_.has(res,"Items")){
                    this.userNotes = _.union(this.userNotes,res.Items);
                    if(this.userNotes.length == 0){
                        this.noNotesFound = true;
                    }
                    else
                    {
                        this.noNotesFound = false;
                    }
                }
            },
            err => {
                if(err.error && err.error.message) {
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
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
            }
        );
     }

     onScrollDown()
     {
         if(this.startKey == 0){
             return;
         }

         this.isListLoading = true;

         this.notesAPIService.getNotes(this.startKey).subscribe(
            res => {
                let data = res;
                if(_.has(res, 'LastEvaluatedKey')){
                    this.startKey = res.LastEvaluatedKey.timestamp;
                }
                else
                {
                    this.startKey = 0;
                }

                if(_.has(res,"Items")){
                    this.userNotes = _.union(this.userNotes,res.Items);
                    if(this.userNotes.length == 0){
                        this.noNotesFound = true;
                    }
                    else
                    {                        
                        this.noNotesFound = false;
                    }
                }
            },
            err => {
                if(err.error && err.error.message) {
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
                this.isListLoading = false;
            },
            () => {
                this.isListLoading = false;
            }
        );
     }

     addNote(note)
     {    
         //Add the newly added Note to existing Notes conatined in userNotes
         this.userNotes.splice(0,0,note);
     }

     openNote(note)
     {
         this.showNote = true;
         this.selectedNote = note;
     }

     onDeleteNote(note){        
        let index = _.findIndex(this.userNotes, (item) => { return item.timestamp == note.timestamp});
        this.userNotes.splice(index, 1);
     }

     onUpdateNote(note)
     {
         let index = _.findIndex(this.userNotes , (item) => { return item.timestamp == note.timestamp});
         this.userNotes.splice(index, 1, note);         
     }

     onCloseNoteModal()
     {
         this.showNote = false;
     }

     

}