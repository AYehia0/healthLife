import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { GlobalService } from './global.service';
import { Router } from '@angular/router';

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
export class AdminService {

    private commonUrl:string = this._global.commonUrl 
    private token: string = ""
    private authStatusListener = new Subject<boolean>()
    private currentUserListener = new Subject<object>()

    constructor(private _http: HttpClient, private _global: GlobalService, private _router: Router) {

    }

    isUserLoggedIn() {
        // check the local Storage 
        let flag = localStorage.getItem("tokenAdmin") ? true:false
        return flag
    }

    getUserListener() {
        return this.currentUserListener.asObservable()
    }
    getAuthStatusListener() {
        return this.authStatusListener.asObservable()
    }

    login(loginData: loginInterface) {

        return this._http.post<response>(`${this.commonUrl}/topSecretRoute/login-admin`, loginData).subscribe( 
            (res:any) => {
                const token = res.data

                if (! token){
                    throw new Error('Login failed')
                }
                
                // setting the token 
                localStorage.setItem('tokenAdmin', `Bearer ${token}`)
            }, 
            // the errors
            (e)=> { },
            () => {
                // what to do if success
                // redirect to profile
                this._global.navMenu = this._global.loginNavLinks
                
                // informing all about the status
                this.authStatusListener.next(true)

                this._router.navigate(['/admin/dashboard'])
            })
        }

    logoutUser() {
        return this._http.get<response>(`${this.commonUrl}/topSecretRoute/logout-admin`).subscribe( (res:any) => {

            // remove the token from the localStorage 
            localStorage.removeItem('tokenAdmin')

            // informing all about the status
            this.authStatusListener.next(false)
            
            // redirect to login page
            this._router.navigateByUrl('/admin/login')

        })
    }

    getUser() {

        return this._http.get<any>(`${this.commonUrl}/topSecretRoute/profile-admin`).subscribe( (res:any) => {

            console.log(res)
            // sending
            this.currentUserListener.next(res)

        })
    }

    // get all the food in the db
    getAllFoodItems():Observable<any>{
        let params = new HttpParams().set('name', "");
        return this._http.get(`${this.commonUrl}/food?`, {params: params})
    }

    deleteFood(id : string):Observable<any>{

        return this._http.delete(`${this.commonUrl}/food/${id}`)

    }

    addFoodByName(name: string):Observable<any>{

        const data = {
            name: name,
            category: []
        }
        console.log(data)
        return this._http.post(`${this.commonUrl}/food`, data)
    }

    editFoodByName(id:string, name: string):Observable<any>{

        const data = {
            name: name,
        }

        return this._http.put(`${this.commonUrl}/food/${id}`, data)
    }


    addCategoryById(id:string, data:any):Observable<any> {
        return this._http.post(`${this.commonUrl}/category/${id}`, data)
    }

    editCategoryById(id:string, data:any):Observable<any> {

        return this._http.put(`${this.commonUrl}/category/${id}`, data)
    }

    deleteCategoryById(id:string):Observable<any> {

        return this._http.delete(`${this.commonUrl}/category/${id}`)
    }



}

