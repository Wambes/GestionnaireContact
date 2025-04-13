import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, LoaderComponent]
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if(this.loginForm.invalid) {
      this.errorMessage = "Veuillez remplir tous les champs correctement !";
      return;
    }

    const { email, password } = this.loginForm.value;

    this.isLoading = true; // Démarrer le chargement
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Connexion reussie', response);
        // Stocker le token dans le localStorage
        // Vérifier si le localStorage est disponible
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('token', response.user.token); // Stocker le token
          console.log('Token enregistré', response.user.token); // Afficher un message de succès
        } else {
          console.error('le localstorage n\'est pas disponible');
        }
        console.log('Token enregistré', response.user.token); // Afficher un message de succès

        this.errorMessage = '';
        this.router.navigate(['/dashboard']).then(success =>{
          this.isLoading = false; // Arrêter le chargement
          if (success) {
            console.log('Redirection vers le tableau de bord réussie');
          }
          else {
            console.error('Erreur de redirection vers le tableau de bord');
          }
        }).catch((err) => {
          console.error('Erreur de redirection', err);
        });
      },
      error: (err) => {
        console.error('Erreur API', err);
        this.errorMessage = err.error.message || 'Erreur de connexion';
        this.isLoading = false; // Arrêter le chargement
        this.loginForm.reset();
      }
    });
  }
}