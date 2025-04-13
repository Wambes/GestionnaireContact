import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../core/services/contacts.service';
import { CommonModule } from '@angular/common';
import { Contact } from '../../shared/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  // Formulaire de contact
  contact!: Contact; //ajout
  contactForm!: FormGroup;
  contactId: number | null = null;
  isEditMode = false;
  //recuperer le token
  token = localStorage.getItem('token') || '';
  //recuperer le userID
  user_id : number = Number(localStorage.getItem('id'));

  constructor(
    private fb: FormBuilder,
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      photo: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.contactId = +id;
        this.contactService.getContactById(this.contactId).subscribe(contact => {
          this.contactForm.patchValue(contact);
        });
      }
    });
  }

  loadContact(id: number): void {
    this.contactService.getContactById(id).subscribe((contact: Contact) => {
      this.contactForm.patchValue(contact);
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    const contactData = {
      ...this.contactForm.value,
      user_id: this.user_id
    };

    if (this.isEditMode && this.contactId) {
      this.contactService.updateContact(this.contactId, contactData).subscribe(() => {
        console.log('Contact mis à jour avec succès !');
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.contactService.addContact(contactData, this.token).subscribe(() => {
        console.log('Contact ajouté avec succès !');
        this.router.navigate(['/dashboard']);
      });
    }
  }
}