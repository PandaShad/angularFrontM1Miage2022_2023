import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const idToken = localStorage.getItem('auth-token');
    if(idToken) {
      const cloned = request.clone({
        headers: request.headers.set('authorization', idToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
