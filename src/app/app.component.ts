import { Component, HostListener } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user.rememberMe){
            localStorage.removeItem('currentUser');    
        }        
    }
    
}