import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './_helpers/index';
import { AlertService, AuthenticationService, UserService, CrfService, DataService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AccountComponent } from './account/account.component';
import { AdmissionsComponent } from './admissions/admissions.component';
import { CentreComponent } from './centre/centre.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SingleAdmissionComponent } from './single-admission/single-admission.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AccountComponent,
        AdmissionsComponent,
        CentreComponent,
        SidebarComponent,
        SingleAdmissionComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        CrfService,
        DataService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }