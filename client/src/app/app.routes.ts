import { Routes } from '@angular/router';
import AuthorizationComponent from './features/(public)/authorization/authorization.component';
import appGuard from "./app.guard";
import DashboardComponent from "./features/(private)/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: '',
    children: [
      {path: 'dashboard', component: DashboardComponent},
    ],
    canActivate: [appGuard]
  },

  { path: 'login', component: AuthorizationComponent },
];
