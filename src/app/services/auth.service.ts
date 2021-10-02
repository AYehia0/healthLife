import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

// register interface 
interface registerInterface {

    name: string,
    email: string,
    password: string,
    personal: {
        age: number,
        gender: string
        activity: string,
        height: number,
        weight: number
    }
}

// the response 
interface response {
    status:string, 
    message:string, 
    data:string
}
// login interface 
interface loginInterface {
    email: string,
    password: string,
}


@Injectable({providedIn: 'root'})
export class AuthService {

    private commonUrl:string = this._global.commonUrl 
    private token: string = ""
    private authStatusListener = new Subject<boolean>()
    private currentUserListener = new Subject<object>()

    constructor(private _http: HttpClient, private _global: GlobalService, private _router: Router) {

    }

    isUserLoggedIn() {
        // check the local Storage 

        let flag = localStorage.getItem("token") ? true:false

        return flag

    }

    getUserListener() {
        return this.currentUserListener.asObservable()
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable()
    }

    registerUser(registerationData: registerInterface){

        return this._http.post<response>(`${this.commonUrl}/user/register`, registerationData).subscribe((res: any) => {
            
            // the response
            console.log(res)


            if (!res.status)
                throw new Error("Failed")
            
            // getting the 
            //this._global.userEmail = res.user
        },
        (e) => {},
        () => {
            // redirect to the login page
            this._router.navigateByUrl('/login')

        })

    }    
    login(loginData: loginInterface) {

        return this._http.post<response>(`${this.commonUrl}/user/login`, loginData).subscribe( 
            (res:any) => {
                const token = res.data

                if (! token){
                    throw new Error('Login failed')
                }
                
                // setting the token 
                localStorage.setItem('token', `Bearer ${token}`)
            }, 
            // the errors
            (e)=> { },
            () => {
                // what to do if success
                // redirect to profile
                this._global.navMenu = this._global.loginNavLinks
                
                // informing all about the status
                this.authStatusListener.next(true)

                this._router.navigate(['/user/dashboard'])
            })
        }

    logoutUser() {
        return this._http.get<response>(`${this.commonUrl}/user/logout`).subscribe( (res:any) => {

            console.log(res)

            // remove the token from the localStorage 
            localStorage.removeItem('token')

            // informing all about the status
            this.authStatusListener.next(false)
            
            // redirect to login page
            this._router.navigateByUrl('/user/login')

        })
    }

    getUser() {

        return this._http.get<any>(`${this.commonUrl}/user/profile`).subscribe( (res:any) => {

            // sending
            this.currentUserListener.next(res)

        })
    }

    // get user meals 
    editUserProfile(data: any):Observable<any> {
        console.error(data)

        return this._http.put(`${this.commonUrl}/user/profile`, data)

    }

}

