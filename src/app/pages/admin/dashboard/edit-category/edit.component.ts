import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard-cate-edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditCategoryComponent implements OnInit{

    name: string = ""
    editFoodForm: FormGroup = new FormGroup({
        type : new FormControl("", [Validators.required]),

        facts: new FormGroup({
            protein : new FormControl("", [Validators.required]),
            fat : new FormControl("", [Validators.required]),
            carb : new FormControl("", [Validators.required]),
        }),
   })

    constructor(private foodService: AdminService, private _route: ActivatedRoute) { }

    ngOnInit() {

        this.name = this._route.snapshot.params.name
       
    }
    
    onEditCategory() {

        if (! this.editFoodForm.valid)
            return
        
        this.foodService.editCategoryById(this._route.snapshot.params.id, this.editFoodForm.value).subscribe(res => {
            console.log(res)
        })

    }

}