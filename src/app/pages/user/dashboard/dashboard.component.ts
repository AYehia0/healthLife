import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FoodApiService } from 'src/app/services/foodapi.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
        
    mealCategoriesBased : any
    userCurrentCals: number = 0
    searchResults: any = {}
    mealsByCategory: any
    user: any = {}

    //private searchResultListenerSub : Subscription = new Subscription()
    searchForm = new FormControl('', [Validators.required]);

    constructor(private apiService: FoodApiService, private authService: AuthService){}

    onSearch(category: string) {

        if (this.searchForm.valid){


            this.apiService.searchFood(this.searchForm.value).subscribe(searchResult => {
                this.searchResults = {
                    category: category,
                    result: searchResult
                }
            })
        }
    }

    // when loading the page check if user is logged in or not 
    ngOnInit() {
        // get the food meals in the user db
        this.getUserInfo()

        // getting the cals 
        this.getTotalCals()

        // getting added meals
        this.getMealsCategory()

    }
    
    getUserInfo() {

        this.authService.getUser()

        this.authService.getUserListener().subscribe((user:any) => {
            this.user = user.data
        })

    }

    // add meal
    addFood(mealId:string, mealType:any, category: string){

        // sending post request
        this.apiService.addFood(mealId, mealType, category).subscribe(res => {
            this.ngOnInit()
        })

    }

    getMealsCategory(){

        this.apiService.getUserMealsByCategory().subscribe(res => {
            this.mealCategoriesBased = res.data
        })
    }

    getTotalCals(){

        this.apiService.getTotalCals().subscribe(res => {

            this.userCurrentCals = res.data
        })
        
    }

    getMealsByCategoryType(type:string) {

        
        const result = this.mealCategoriesBased?.find((el:any) => el?.type == type)

        if (result?.result.length == 0)
            return null


        return result?.result
    }

    deleteMeal(mealId:string, type: string) {
        this.apiService.deleteMealById(mealId, type).subscribe(res => {
            this.ngOnInit()
        })
    }



}


