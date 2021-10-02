import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-admin-dashboard-add',
    templateUrl: 'add.component.html',
    styleUrls: ['./add.component.css']
})
export class AddFoodComponent implements OnInit{

    addFoodForm: FormGroup = new FormGroup({
        name : new FormControl(""),
    })
    constructor(private foodService: AdminService) { }

    ngOnInit() {
       
    }

    onAdd(name:any){

        if (name.value != "") {
            this.foodService.addFoodByName(name.value).subscribe(res => {
                console.log(res)
            })
        }
    }
}