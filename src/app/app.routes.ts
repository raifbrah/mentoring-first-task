import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { UsersComponent } from './features/users/users.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
];
