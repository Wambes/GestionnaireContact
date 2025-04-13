//empecher l'accès à une page si l'utilisateur n'est pas connecté
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Accès autorisé
    } else {
      this.router.navigate(['/login']); // Redirection vers la page de connexion
      return false;
    }
  }
}