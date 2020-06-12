import { OnInit, Component , EventEmitter, Output} from "@angular/core";

@Component({
    selector:'app-navbar',
    templateUrl:'navbar.component.html'
})

export class NavbarComponent implements OnInit{

    @Output() showNoteModalEvent = new EventEmitter<void>();
    @Output() signOutUserEvent = new EventEmitter();
       
    ngOnInit(){}

    //Inform the Parent Component (Home) that 'Add Note' button has been clicked in Navbar. 
    //This information will be passed to 'Home' via 'showNoteModalEvent' Output property
    //So that Home Component will render 'Add Note' window via 'showNoteModalEvent' function declared in 'Home'
    onShowNoteModal($event) {
        this.showNoteModalEvent.emit();        
    }
    
    onSignOut(){

        this.signOutUserEvent.emit();

    }

}

