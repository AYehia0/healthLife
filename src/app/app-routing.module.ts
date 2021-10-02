import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AddCategoryComponent } from './pages/admin/dashboard/add-category/cate.component';
import { AddFoodComponent } from './pages/admin/dashboard/add-food/add.component';
import { EditCategoryComponent } from './pages/admin/dashboard/edit-category/edit.component';
import { EditFoodComponent } from './pages/admin/dashboard/edit-food/edit-food.component';
//import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ShowFoodComponent } from './pages/admin/dashboard/show-food/show.component';
import { AdminLoginComponent } from './pages/admin/login/login.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: "user", component:UserComponent , children: [
      {path:'register', component:RegisterComponent},
      {path:'login', component:LoginComponent},
      {path:'dashboard', component:DashboardComponent},
      {path:'profile', component:ProfileComponent},
    ]
  },
  {
    path: "admin", component: AdminComponent ,children: [
      {path:'login', component: AdminLoginComponent},
      {path:'dashboard',  children: [

        // add the food api things here
 
        // show food 
        {path:'show', component: ShowFoodComponent},

        // add food 
        {path:'add', component:AddFoodComponent},

        // Edit food
        {path:'edit-food/:name/:id', component:EditFoodComponent},

        // Add category
        {path:'add-category/:name/:id', component:AddCategoryComponent},

        // Edit category
        {path:'edit-category/:name/:id', component:EditCategoryComponent},

      ]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
