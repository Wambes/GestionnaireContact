import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../shared/models/contact.model';
import { ContactsService } from '../../core/services/contacts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class DashboardComponent implements OnInit {

  contacts: Contact[] = []; // Liste des contacts
  page: number = 1; // Page actuelle
  pageSize: number = 10; // Nombre de contacts par page
  totalContacts: number = 0; // Nombre total de contacts
  searchQuery: string = ''; // Requête de recherche
  
  constructor(private authService: AuthService, private contactService: ContactsService) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.loadContacts();
  }

  // Méthode pour changer la page actuelle
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadContacts();
    }
  }

  // Méthode pour changer la page suivante
  nextPage() {
    const totalPages = Math.ceil(this.totalContacts / this.pageSize);
    if (this.page < totalPages) {
      this.page++;
      this.loadContacts();
    }
  }

  loadContacts() {
    this.contactService.getContacts(this.page).subscribe(response => {
      this.contacts = response.data;
      this.totalContacts = response.pagination.total;
    });
  }

  searchContacts() {
    if (this.searchQuery.trim()) {
      this.contactService.searchContacts(this.searchQuery).subscribe(response => {
        this.contacts = response.data;
        this.totalContacts = response.pagination.total;
      });
    } else {
      this.loadContacts();
    }
  }

  deleteContact(id: number){
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      this.contactService.deleteContact(id).subscribe(() => {
        this.loadContacts(); // Recharger la liste des contacts après suppression
      });
    }
  }
}
