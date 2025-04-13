import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Contact } from '../../shared/models/contact.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'https://www.api.4gul.kanemia.com/contacts'; // URL de l'API
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Récupérer tous les contacts
  getContacts(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`, { headers: this.getHeaders() })
  }

  //Rechercher un contact
  searchContacts(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?search=${query}`, { headers: this.getHeaders() });
  }

  //supprimer un contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contact, { headers: this.getHeaders() });
  }

  addContact(contact: Contact, token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contact, { headers: this.getHeaders() })
  }
}