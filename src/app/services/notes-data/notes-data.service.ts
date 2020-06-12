import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotesDataService {
    
    private announceAddNoteSource = new Subject();
    //Public Property of Observable type to hold the newly added Note instance
    addNote$ = this.announceAddNoteSource.asObservable();
    
    constructor() { }

    announceAddNote(note){
        //Add the note instnace to the observable. This will be used to get the newly added  notes in other component(Notes Component)
        this.announceAddNoteSource.next(note);
    }
    
}