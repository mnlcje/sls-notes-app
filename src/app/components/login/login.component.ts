import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    constructor(private authService : AuthService) { }

    ngOnInit() { 
        
    }

    onSignIn()
    {
        this.authService.login();
    }
}