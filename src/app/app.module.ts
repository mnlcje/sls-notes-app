import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './components/spinner/spinner-component';
import { NoteComponent } from './components/notes/note.component';
import { NoteSnapshotComponent } from './components/notes/note-snapshot.component';
import { NotesComponent } from './components/notes/notes.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,        
        ReactiveFormsModule,
        FormsModule,
        InfiniteScrollModule        
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        NoteComponent,
        NotesComponent,
        NoteSnapshotComponent,            
        SpinnerComponent                
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }
