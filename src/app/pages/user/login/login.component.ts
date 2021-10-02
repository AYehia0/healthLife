import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    userEmail = ""
    constructor(private authService: AuthService, private _global: GlobalService ,  private _router: Router) { }

    ngOnInit() {
       
    }
    
    loginForm = new FormGroup({

        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required])

    })

    onLogin() {

        // checking the form
        if (this.loginForm.invalid)
            return 

        this.authService.login(this.loginForm.value)
        
    }
}