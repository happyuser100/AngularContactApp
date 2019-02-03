import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contactdata';
import { ContactService } from '../contact-list/services/contact.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {

  contact: Contact;
  addForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _contactService: ContactService
  ) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      position: ['', Validators.required],
      imageUrl: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddrss: ['', Validators.required],
      companyCity: ['', Validators.required],
      companyState: ['', Validators.required],
      companyZip: ['', Validators.required],
      companyPhone: ['', Validators.required],
    });
  }

  onSubmit() {
    debugger
    const contact: Contact = this.addForm.value;
    this._contactService.addContact(contact)
      .subscribe(
        data => {
          const contacts_local = localStorage.getItem('contacts');
          if (contacts_local != null) {
            const retrievedContacts: Contact[] = JSON.parse(contacts_local);
            retrievedContacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(retrievedContacts));
          }

          alert('Contact Added successfully.');
          this.router.navigate(['contacts']);
        },
        error => {
          alert(error);
        }
      );
  }

}
