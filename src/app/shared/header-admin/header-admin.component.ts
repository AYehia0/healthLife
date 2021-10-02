import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AdminService } from 'src/app/services/admin.service'

@Component({
    selector: 'app-header-admin',
    templateUrl: 'header-admin.component.html',
    styleUrls: ['./header-admin.component.css']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {


    private authListenerSub : Subscription = new Subscription()
    

    constructor(private authService: AdminService) {}

    isUserAuth = this.authService.isUserLoggedIn()

    // logout button
    logout() {
        this.authService.logoutUser()
    }

    ngOnDestroy(): void {
        throw new Error('Method not implemented.')
    }

    ngOnInit() {
        this.authListenerSub = this.authService.getAuthStatusListener().subscribe(isAuth => {

            this.isUserAuth = isAuth
        })
    }

    OnDestroy() {
        this.authListenerSub.unsubscribe()
    }
    
}


