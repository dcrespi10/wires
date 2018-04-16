import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { CentreComponent } from './centre/index';
import { AdmissionsComponent } from './admissions/index';
import { AccountComponent } from './account/index';
import { AuthGuard, ConfirmDeactivateGuard, ConfirmDeactivateCentreGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'centre/:id', component: CentreComponent, canDeactivate:[ConfirmDeactivateCentreGuard] }, 
    { path: 'admissions/:id', component: AdmissionsComponent, canDeactivate: [ConfirmDeactivateGuard] }, 
    { path: 'account/:id', component: AccountComponent }, 

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);