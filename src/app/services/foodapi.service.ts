import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodApiService {

    public commonUrl: string = "http://localhost:8080"
    public totalUserCals: number = 0
    constructor(private _http: HttpClient) {

    }

   // searcing the database : /food?name=potato&range=5
    searchFood(searchTerm: string):Observable<any>{
        
        let params = new HttpParams().set('name', searchTerm);
        return this._http.get(`${this.commonUrl}/food?`, {params: params})
    }

    // adding meals to user
    addFood(mealId: string, mealType: string, category: string):Observable<any>{
        
        const dataForm = {
            mealId : mealId,
            categories: {
                type : mealType,
                category: category
            }
        }

        return this._http.post(`${this.commonUrl}/user/food`, dataForm)
    }

    // get user meals 
    getUserMealsByCategory():Observable<any> {

        return this._http.get(`${this.commonUrl}/user/foodtype`)

    }

    // get all the cals by getting all meals then calling food api for meal info
    getTotalCals():Observable<any>{

        return this._http.get(`${this.commonUrl}/user/foodcals`)

    } 

    // get meal info by id
    getMealInfoById(id: string):Observable<any>{

        return this._http.get(`${this.commonUrl}/food/${id}`)

    } 

    // delete meal 
    deleteMealById(mealId: string, type:string):Observable<any>{
        return this._http.delete(`${this.commonUrl}/user/foodone/${mealId}/${type}`)
    }

}

