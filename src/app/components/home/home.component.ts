import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    showNoteModal = false;
    newNote;

    constructor(

        private authService : AuthService

    ) { }

    ngOnInit() { 
        this.newNote = {};
    }

    onShowNoteModal(){

        this.showNoteModal = true;
    }

    onSignOut(){

        this.authService.logout();
    }

    onCloseNoteModal()
    {
         this.showNoteModal = false;
    }
}