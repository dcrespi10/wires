import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailValidator } from '@angular/forms';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'restore.component.html'
})

export class RestoreComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    restore() {
        if (this.model.vpassword !== this.model.password)
          return
        this.loading = true;
        var token = document.location.href.split('token=')[1];
        this.model.token = token;
        this.userService.restorePassword(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Password reset was successful!', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
