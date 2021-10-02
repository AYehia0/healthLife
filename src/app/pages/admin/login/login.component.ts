import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class AdminLoginComponent implements OnInit{

    userEmail = ""
    constructor(private authService: AdminService) { }

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