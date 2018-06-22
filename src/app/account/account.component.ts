import { Component, OnInit } from '@angular/core';
import { User, News } from '../_models/index';
import { UserService } from '../_services/index';
import { EmailValidator } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currentUser: User;
  constructor(private userService: UserService, public snackBar: MatSnackBar) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    
  }

  saveUser(){
    this.userService.update(this.currentUser).subscribe(
      data => {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        this.snackBar.open("User updated!", undefined, {
          duration: 2000,
        });
      },
      error => {
        this.snackBar.open("Something went wrong!", undefined, {
          duration: 2000,
        });
      });
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


}
