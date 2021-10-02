import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'
import { GlobalService } from 'src/app/services/global.service'

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


    private authListenerSub : Subscription = new Subscription()
    
    //public navRoutes = this._global.navMenu

    constructor(private authService: AuthService) {}

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


