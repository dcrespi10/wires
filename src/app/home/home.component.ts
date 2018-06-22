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

    isMobile(){
        var ua = navigator.userAgent;
        var width = window.screen.width;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua))
          return true;
        if (width < 900)
          return true;
        console.log(width);
        return false;
      }

    getNews(){
        this.newsService.getCollection(this.currentUser._id, "news")
        .subscribe(
            data => {
                if (!data){
                    data = [{ 
                        "_id" : "1d", 
                        "title" : "Welcome to the WIRES network!", 
                        "text" : "This is the WIRES news section. Here you can get any communication from the WIRES team, like news or follow-up to be made. Navigate throught the left side bar. Enjoy!", 
                        "date" : "2018-04-20", 
                        "expiryDate" : "2999-12-31", 
                        "priority" : "low", 
                        "userid" : "5adb12815444ba207c75932c"
                    }];
                }
                this.news = data;                            

            },
            error => {});
    }
}