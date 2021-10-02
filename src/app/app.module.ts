import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// material 
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'

// components 
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { UserInterceptor } from './providers/user.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper'
import { MatExpansionModule } from '@angular/material/expansion'
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { AdminLoginComponent } from './pages/admin/login/login.component';
//import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminHeaderComponent } from './shared/header-admin/header-admin.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ShowFoodComponent } from './pages/admin/dashboard/show-food/show.component';
import { MatTableModule } from '@angular/material/table'
import { AdminInterceptor } from './providers/admin.interceptor';
import { AddFoodComponent } from './pages/admin/dashboard/add-food/add.component';
import { AddCategoryComponent } from './pages/admin/dashboard/add-category/cate.component';
import { EditCategoryComponent } from './pages/admin/dashboard/edit-category/edit.component';
import { EditFoodComponent } from './pages/admin/dashboard/edit-food/edit-food.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    AdminLoginComponent,
    //AdminDashboardComponent,
    AdminHeaderComponent,
    UserComponent,
    AdminComponent,
    ShowFoodComponent,
    AddFoodComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    EditFoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatGridListModule,
    MatSelectModule,
    MatStepperModule,
    MatExpansionModule,
    MatTableModule  
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass:UserInterceptor, multi:true }, { provide: HTTP_INTERCEPTORS, useClass:AdminInterceptor, multi:true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
