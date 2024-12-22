import { Routes } from '@angular/router';
import AuthorizationComponent from './features/authorization/authorization.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'login', component: AuthorizationComponent },
];
