import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'contact-details/:id', component: ContactDetailsComponent, canActivate: [AuthGuard] },
    { path: 'contact-form', component: ContactFormComponent, canActivate: [AuthGuard] },
    { path: 'contact-form/:id', component: ContactFormComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' } // Redirection si la route n'existe pas
];