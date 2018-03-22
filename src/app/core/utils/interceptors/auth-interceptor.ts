import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { Common } from '../../utils/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (
    private injector: Injector
  ) { }

  public intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Public-Key': `${this.injector.get(Common).getPublicKey()}`,
      'Private-Key': `${this.injector.get(Common).getPrivateKey()}`,
      'Token': this.injector.get(Common).getToken('__g-api') || ''
    });

    const authReq = request.clone({
      headers: headers,
      url: this.injector.get(Common).getApiUrl().concat(request.url)
    });

    return next.handle(authReq)
      .catch((err) => this.handleError(err))
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (!this.injector.get(Common).getToken('__g-api')) {
            this.injector.get(Common).setToken('__g-api', event.headers.get('Token'));
          }
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            if (!this.injector.get(Common).getToken('__g-api')) {
              this.injector.get(Common).destroyToken('__g-api');
            }

            return new EmptyObservable();
          }
        }

        return Observable.throw(err);
      })
      .finally(() => {
        // code here !
      });
  }

  private handleError (err: HttpErrorResponse): Observable<any> {
    return Observable.throw(err);
  }
}
