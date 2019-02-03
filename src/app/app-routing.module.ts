import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import { ContactEditComponent } from './components/contact-edit/contact-edit.component';

const routes: Routes = [
  {
    path: 'contacts',
    component : ContactListComponent
  },
  {
    path: 'add-contact',
    component: ContactAddComponent,
  },
  {
    path: 'edit-contact',
    component: ContactEditComponent,
  },
  { path: '**', redirectTo: 'contacts' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
