import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'recover.component.html'
})

export class RecoverComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    recover() {
        this.loading = true;
        this.userService.recoverPassword(this.model.email)
            .subscribe(
                data => {
                    this.alertService.success('An email was succesfully sent to the specified email address!', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
