import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { SuccessLogin, User } from '../command-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService{

  private baseURL = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient, private router: Router) { }
  login(username: string, password: string): Observable<User> {
    return this.http.post<SuccessLogin>(this.baseURL + '/login', { username: username, password: password })
      .pipe(
        map(result => {
          sessionStorage.setItem('access_token', result.token);
          sessionStorage.setItem('recup_succursales', result.user.succursales_id);
          sessionStorage.setItem('recup_user', JSON.stringify(result.user));
          this.router.navigateByUrl('/vente');
          return result.user;
        })
      );
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  getSuccursale(): string | null {
    return sessionStorage.getItem('recup_succursales');
  }

  getUser(): string | null {
    return sessionStorage.getItem('recup_user');
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('recup_succursales');
    this.router.navigateByUrl('/login');
  }

  isAuthenticatedUser(): boolean {
    return !!this.getToken();
  }
}
