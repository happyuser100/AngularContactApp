import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../contact-list/services/contact.service';
import { Contact } from 'src/app/models/contactdata';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact: Contact;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private _contactService: ContactService
  ) {  }


  ngOnInit() {
    debugger
    const editContactId = window.localStorage.getItem('editContactId');
    if (!editContactId) {
      alert('Invalid action.');
      this.router.navigate(['contacts']);
      return;
    }
    this.editForm = this.formBuilder.group({
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

    this._contactService.getContactById(+editContactId)
      .subscribe(data => {
        debugger
        this.editForm.patchValue(data);
      });
  }

  onSubmit() {
    debugger
    const contact: Contact = this.editForm.value;
    this._contactService.updateContact(contact)
      .pipe(first())
      .subscribe(
        data => {
          const contacts_local = localStorage.getItem('contacts');
          if (contacts_local != null) {
            const retrievedContacts: Contact[] = JSON.parse(contacts_local);
            const index = retrievedContacts.findIndex(item => item.id === contact.id);
            retrievedContacts.splice(index, 1);
            retrievedContacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(retrievedContacts));
          }
          alert('Contact updated successfully.');
          this.router.navigate(['contacts']);
        },
        error => {
          alert(error);
        }
      );
  }

}
