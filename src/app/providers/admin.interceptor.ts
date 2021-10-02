import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let token = localStorage.getItem('tokenAdmin')
    if(token){
      request = request.clone({
        headers: request.headers.set("Authorization", token)
      })
    }
    return next.handle(request);
  }
}