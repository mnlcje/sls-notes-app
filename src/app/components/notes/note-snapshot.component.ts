import { NotesApiService } from './../../services/notes-api/notes-api.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'note-snapshot',
    templateUrl: 'note-snapshot.component.html'
})

export class NoteSnapshotComponent implements OnInit {
    
    @Input() note;

    @Output() deleteNoteEvent = new EventEmitter();
    
    alert;
    isLoading = false;

    constructor
    (
        private noteAPIService : NotesApiService

    ) { }

    ngOnInit() { 
        this.alert = {};
    }

    deleteNote($event, timestamp){
        $event.stopPropagation();
        this.isLoading = true;
        this.noteAPIService.deleteNote(timestamp).subscribe(
            res=>{
                this.deleteNoteEvent.emit(timestamp);
            },
            err =>
            {
                if(err.error && err.error.message) {
                    this.alert = {
                        type: 'danger',
                        message: err.error.message
                    };
                } else {
                    this.alert = {
                        type: 'danger',
                        message: err.message
                    }
                }
                this.isLoading = false;
            },
            ()=>{

                this.isLoading = false;

            }

        );
    }
}