import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthentificationService , private router:Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticatedUser()) {
      return true;  // L'utilisateur est connecté, autoriser l'accès à la route
    } else {
      this.router.navigate(['']);  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return false;
    }
  }
}
