import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { RecoverComponent } from './recover/index';
import { RestoreComponent } from './restore/index';
import { CentreComponent } from './centre/index';
import { AdmissionsComponent } from './admissions/index';
import { AccountComponent } from './account/index';
import { AuthGuard, ConfirmDeactivateGuard, ConfirmDeactivateCentreGuard } from './_guards/index';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'recover', component: RecoverComponent },
    { path: 'restore', component: RestoreComponent },
    { path: 'centre/:id', component: CentreComponent, canDeactivate:[ConfirmDeactivateCentreGuard] }, 
    { path: 'wires/:id/:module', component: AdmissionsComponent, canDeactivate: [ConfirmDeactivateGuard] }, 
    { path: 'openabdomen/:id/:module', component: AdmissionsComponent, canDeactivate: [ConfirmDeactivateGuard] }, 
    { path: 'infections/:id/:module', component: AdmissionsComponent, canDeactivate: [ConfirmDeactivateGuard] },
    { path: 'causticingestiondatabase/:id/:module', component: AdmissionsComponent, canDeactivate: [ConfirmDeactivateGuard] }, 
    { path: 'account/:id', component: AccountComponent }, 

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);