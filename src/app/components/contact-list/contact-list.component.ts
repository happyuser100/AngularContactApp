import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from './services/contact.service';
import { Contact } from 'src/app/models/contactdata';

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  isMobile: boolean;
  isTablet: boolean;
  isDesktopDevice: boolean;

  constructor(private router: Router,
    private _contactService: ContactService,
    private deviceService: DeviceDetectorService) {
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log('isMobile=' + this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log('isTablet=' + this.isTablet);  // returns if the device us a tablet (iPad etc)
    console.log('isDesktopDevice=' + this.isDesktopDevice); // returns if the app is running on a Desktop browser.
  }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    console.log('LoadData');
    debugger;

    const contacts_local = localStorage.getItem('contacts');
    if (contacts_local) {
      this.contacts = JSON.parse(contacts_local);
      console.log('localstorage contactsList=' + this.contacts);
      return;
    }

    this._contactService.getContactList()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
        console.log('getcontactsList=' + this.contacts);
      });
  }

  editContact(contact: Contact) {
    window.localStorage.removeItem('editContactId');
    window.localStorage.setItem('editContactId', contact.id.toString());
    this.router.navigate(['edit-contact']);
  }

  deleteContact(contact: Contact) {
    if (confirm('Are you sure to delete contact ' + contact.firstName + ' ' + contact.lastName + '?')) {
      this._contactService.deleteContact(contact.id)
        .subscribe(data => {
          this.contacts = this.contacts.filter(u => u !== contact);
          localStorage.setItem('contacts', JSON.stringify(this.contacts));
        });
    }
  }

  addContact() {
    this.router.navigate(['add-contact']);
  }

}
