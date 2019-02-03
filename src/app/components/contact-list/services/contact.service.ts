import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from 'src/app/models/contactdata';
import { contacts } from './contact-demo-data';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContactList(): Observable<Contact[]> {
    return of(contacts);
  }

  getContactById(id: number): Observable<Contact> {
    return of(contacts.find(d => d.id === id));
  }

  updateContact(contact: Contact): Observable<Contact> {
    const index = contacts.findIndex(item => item.id === contact.id);
    contacts[index] = contact;
    return of(contact);
  }

  deleteContact(id: number): Observable<Contact[]> {
    const index = contacts.findIndex(item => item.id === id);
    return of(contacts.splice(index, 1));
  }

  addContact(contact: Contact): Observable<Contact> {
    const v   = contacts.map( x => {
      return x.id;
    });
    const contactMaxId = Math.max(...v);

    contact.id =   (contacts.length === 0) ? 1 : contactMaxId;
    contacts.push(contact);
    return of(contact);
  }

}
