import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FoodApiService } from 'src/app/services/foodapi.service';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    
    user: any
    editProfileForm = new FormGroup({

        name: new FormControl("", [Validators.required]),
        password: new FormControl(""),
        weight : new FormControl("", [Validators.required]),
        height: new FormControl("", [Validators.required]),

    })

    constructor(private apiService: FoodApiService, private authService: AuthService){

    }

    // when loading the page check if user is logged in or not 
    ngOnInit() {

       this.getUserInfo() 

    }

    getUserInfo() {

        this.authService.getUser()

        this.authService.getUserListener().subscribe((user:any) => {
            this.user = user.data
        })

    }
    onEdit() {

        console.log(this.editProfileForm.value)
        // checking the form
        if (this.editProfileForm.valid){

            this.authService.editUserProfile(this.editProfileForm.value).subscribe(res => {
                console.log(res)
            })

        }

    }

}


