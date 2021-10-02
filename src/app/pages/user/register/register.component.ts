import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';

// {
//     "name": "SomeOne",
//     "email": "someone234@gmail.com",
//     "password": "Someone123!@#",
//     "personal": {
//         "age": 20,
//         "gender": "female",
//         "activity": "high",
//         "height": 176,
//         "weight": 70
//     }
// }

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    isLinear = false;
    hide = true 
    firstFormGroup: FormGroup = new FormGroup({});
    secondFormGroup: FormGroup = new FormGroup({});

    constructor(private authService: AuthService) {}
   
    userSpecific = {
        selectedGender: "",
        activityLvl: "",
    }
    genders = [
        {value: "Male"},
        {value: "Female"},
    ]

    // ['low', 'mod', 'high', 'ext']
    activityLvls = [
        {lvl: "Low", val:"low"},
        {lvl: "Moderate", val:"mod"},
        {lvl: "High", val:"high"},
        {lvl: "Very High", val:"ext"},
    ]
    // register form
    registerForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
        name: new FormControl("", [Validators.required]),
        personal: new FormGroup({
            age: new FormControl("", [Validators.required]),
            gender: new FormControl("", [Validators.required]),
            activity: new FormControl("", [Validators.required]),
            height: new FormControl("", [Validators.required]),
            weight: new FormControl("", [Validators.required]),
        })
   })

    
    onRegister() {

        // setting the gender and the activity lvl
        this.registerForm.patchValue({personal: {gender: this.userSpecific.selectedGender.toLowerCase(), activity: this.userSpecific.activityLvl}})

        // sending the form to the database 
        if (! this.registerForm.valid )
            return 

        this.authService.registerUser(this.registerForm.value)

    }
}

