import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

    public userEmail: string = "" 
    public commonUrl: string = "http://localhost:8080"

    // nav links that doensn't require log in
    public noLoginNavLinks = [
        {path:'/register', name: "Register", auth: false},
        {path:'/login', name: "Login", auth: false},
    ]

    // nav links that require log in 
    public loginNavLinks = [
        {path:'/profile', name: "Profile", auth: true},
    ]


    public isLoggedIn = localStorage.getItem("token") ? true:false
    public navMenu = this.isLoggedIn ? this.loginNavLinks :this.noLoginNavLinks

    constructor(private _http: HttpClient) {

    }
}

