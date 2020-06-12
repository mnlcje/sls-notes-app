/* 
This reference describes the JavaScript client methods and attributes you will use to implement 
Google Sign-In in your web applications :

https://developers.google.com/identity/sign-in/web/reference
*/
declare const gapi:any;

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare const API_ROOT: string;
declare const STAGE: string;

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor
    (
        private router : Router,
        private httpClient : HttpClient
    ) 
    { 
        gapi.load('auth2',function(){
            gapi.auth2.init();
        });
    }

    async login()
    {
        let googleAuth = await gapi.auth2.getAuthInstance();    
        let googleUser = await googleAuth.signIn({ scope: 'profile email' });
        let id_token = googleUser.getAuthResponse().id_token;
        
        //Set Credentials
        await this.setAWSTempCredentials(id_token);

        //After successful Login , Navigate to Home Page
        this.router.navigate(['']).then( () => {
            window.location.reload();
        });
        
    }
    
    async logout(){
        var googleAuth = gapi.auth2.getAuthInstance();
        /*
        The problem wiith signout is when he presses the sign in button again, the account chooser won't appear. 
        It just uses the old cached account.
        //await googleAuth.signOut();
        So using disconnect
         */
        await googleAuth.disconnect();
        
        localStorage.removeItem('id_token');
        localStorage.removeItem('aws');

        this.router.navigate(['login']);
    }

    async setAWSTempCredentials(id_token)
    {
        try{
            let options = {
                headers: {
                    'Authorization': id_token,
                    }                
            };

            let endpoint = API_ROOT + STAGE + '/auth';   
            let credentials = await this.httpClient.get(endpoint, options).toPromise();
            localStorage.setItem('id_token', id_token);
            localStorage.setItem('aws', JSON.stringify(credentials));
            return;
        }
        catch(error){
            localStorage.removeItem('id_token');
            localStorage.removeItem('aws');
            throw error;
        }
         
    }

    /**
     * In addition to AWS credentials expiring after a given amount of time, 
     * the login token from the identity provider will also expire. 
     * Once this token expires, it will not be usable to refresh AWS credentials, 
     * and another token will be needed. The SDK does not manage refreshing of the token value
     */
    async isLoggedIn(){
        let id_token = this.getIdToken();
        if(id_token)
        {
            try{
                let endpoint = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + id_token;
                return await this.httpClient.get(endpoint).toPromise();
            }
            catch(err){
                throw err;
            }
        }
        else
        {
            throw new Error('No Token Found');
        }
    }

    getCredentials() {
        return localStorage.getItem('aws');
    }

    getIdToken() {
        return localStorage.getItem('id_token');
    }
}

