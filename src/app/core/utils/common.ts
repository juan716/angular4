import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Common {
  public getPublicKey (): string {
    return environment.public_key;
  }

  public getPrivateKey (): string {
    return environment.private_key;
  }

  public getApiUrl (): string {
    return environment.api_url;
  }

  public getToken (name: string): string {
    const length = (name.length + 1);

    return document.cookie
      .split(';')
      .map((c: string) => c.trim())
      .filter((cookie: string) => {
        return cookie.substring(0, length) === `${name}=`;
      })
      .map((cookie: string) => {
        return decodeURIComponent(cookie.substring(length));
      })[0] || null;
  }

  public setToken(name: string, value: string, days?: number): void {
    const date = new Date();
    let expires = '';

    if (!days) {
      days = 1;
    }

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    expires = '; expires=' + date.toUTCString();

    document.cookie = name + '=' + value + expires + '; path=/';
  }

  public destroyToken(name: string): void {
    this.setToken(name, '', -1);
  }
}
