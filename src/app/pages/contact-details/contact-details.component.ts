import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../../shared/models/contact.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContactsService } from '../../core/services/contacts.service';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent implements OnInit {
  contactId!: number;
  contact!: Contact;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContactById(this.contactId).subscribe({
      next: (contact: Contact) => {
        this.contact = contact;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du contact', err);
      }
    });
  }
}
