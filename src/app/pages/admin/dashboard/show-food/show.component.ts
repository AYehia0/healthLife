import { Component, OnInit } from '@angular/core'
import { AdminService } from 'src/app/services/admin.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
    selector: 'app-admin-dashboard-show',
    templateUrl: 'show.component.html',
    styleUrls: ['./show.component.css'],
    animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShowFoodComponent implements OnInit{

    columnsToDisplay = ['name', '_id', 'mod'];
    expandedElement: any
    user:any

    //dataSource: any

    allFood: any = []
    constructor(private foodService: AdminService) { }


    ngOnInit() {

        this.foodService.getUser()
        this.allFood = this.getFoodItems()
       
    }

    getUserInfo() {

        this.foodService.getUser()

        this.foodService.getUserListener().subscribe((user:any) => {
            this.user = user.data
        })

    }



    // call the api to get the food items 
    getFoodItems() {
        this.foodService.getAllFoodItems().subscribe(res => {
            this.allFood = res
        })

    }

    deleteFoodItem(id: string) {

       this.foodService.deleteFood(id).subscribe(res => {
           console.log(res)
       }, () => {},
       () => {

           // delete the task from the all tasks 
           // this isn't a good idea at all
           let ind = this.allFood.findIndex((el:any) => el._id == id)

           if (ind != -1){

                this.allFood.splice(ind, 1)

                // here : check 
                this.ngOnInit()
           }
       })

    }

    deleteCategory(id:string) {

       this.foodService.deleteCategoryById(id).subscribe(res => {
           console.log(res)
       })

       // reloading 
       this.ngOnInit()


    }

}