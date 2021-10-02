import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard-edit-food',
    templateUrl: 'edit-food.component.html',
    styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit{

    addFoodForm: FormGroup = new FormGroup({
        name : new FormControl(""),
    })
    constructor(private foodService: AdminService, private _route: ActivatedRoute) { }

    ngOnInit() {
       
    }

    onEdit(name:any){

        if (name.value != "") {
            this.foodService.editFoodByName(this._route.snapshot.params.id, name.value).subscribe(res => {
                console.log(res)
            })
        }
    }
}