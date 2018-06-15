import { Component, OnInit } from '@angular/core';
import { User, News } from '../_models/index';
import { UserService, DataService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    news: any;
    constructor(private userService: UserService, private newsService: DataService,) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.newsService.setCollectionName("news");
        this.news = [];
        
    }

    ngOnInit() {
        this.getNews();
    }

    getNews(){
        this.newsService.getCollection(this.currentUser._id, "news")
        .subscribe(
            data => {
                console.log(data);
                this.news = data;                            
            },
            error => {});
    }
}