import { Component, HostListener } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent { 

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        localStorage.removeItem('currentUser');
    }
    
}