import { Component, OnInit } from '@angular/core';

import { User, News } from '../_models/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    news: News[];
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.news = [
            {_id:"1d", title:"Welcome to the WIRES network!", text:"This is the WIRES news section. Here you can get any communication from the WIRES team, like news or follow-up to be made. Navigate throught the left side bar. Enjoy!",
            date:"2018-04-20", expiryDate:"", priority:"low"},
            {_id:"2a", "title":"Older news test", "text":"This is an older news with higher priority. We should group them somehow.",
            "date":"2018-04-10", "expiryDate":"", "priority":"high"}
        ];
    }

    ngOnInit() {
        // shall load news
    }
    
}