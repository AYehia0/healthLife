import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { FormsModule } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-dashboard-cate',
    templateUrl: 'cate.component.html',
    styleUrls: ['./cate.component.css']
})
export class AddCategoryComponent implements OnInit{

    name: string = ""
    addFoodForm: FormGroup = new FormGroup({
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
    
    onAddCategory() {

        if (! this.addFoodForm.valid)
            return

        
        this.foodService.addCategoryById(this._route.snapshot.params.id, this.addFoodForm.value).subscribe(res => {
            console.log(res)
        })

    }

}