import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, CrfService, DataService } from '../_services/index';
import { MatSnackBar } from '@angular/material';
import { Crf } from '../_models/index';
@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css']
})
export class CentreComponent implements OnInit {

  id:string;
  model:any={};
  form: Crf;
  centreDataList: any=[];
  centreDataId: string;
  unsaved: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private crfService: CrfService,
    private centresDataService: DataService,
    private alertService: AlertService,
    public snackBar: MatSnackBar) {
      this.centresDataService.setCollectionName("centresdata");
     }

  ngOnInit() {
    this.route.params.subscribe(
      (params : any) => {
         this.id = params["id"]; 
         this.getcrf();   
         this.loadCentresDataList()
      }
   );   
  }
  
  loadCentresDataList(){
    var letExit = true;
    if (this.unsaved){
      letExit = window.confirm('Data have been modified. Do you really want to exit?');
    }
    if (this.unsaved == false || letExit){
      this.centreDataId = undefined;
      this.centresDataService.getCollection(this.id).subscribe(
        data => {
          this.centreDataList = data;
        }, 
        error =>{
          console.log("uff");
        });
    }
  }

  loadCentreData(centreDataId: string){
    this.centreDataId = centreDataId;
    this.centresDataService.getByIdFromCollection(this.id, this.centreDataId).subscribe(
      data => {
        this.model = data;
        this.unsaved = false;
      }, 
      error =>{
        console.log("uff");
      });   
  }

  valueHasChanged(event){
    this.unsaved = event;            
  }

  hasChanges(): boolean{
    return this.unsaved;
  }
  save(){
    if (this.model.userid){
      this.centresDataService.update(this.model).subscribe(
        data => {
          this.unsaved = false;
          this.snackBar.open("Data saved!", undefined, {
            duration: 2000,
          });
        },
        error => {
          this.unsaved = false;
          this.snackBar.open("Something went wrong!", undefined, {
            duration: 2000,
          });
        }
      );
    }else{
      this.model.userid = this.id;
      this.centresDataService.create(this.model).subscribe(
        data => {
          this.unsaved = false;
          this.snackBar.open("Data saved!", undefined, {
            duration: 2000,
          });
        },
        error => {
          this.unsaved = false;
          this.snackBar.open("Something went wrong!", undefined, {
            duration: 2000,
          });
        }
      );
    }    
  }

  getcrf() {
    this.crfService.getCrf("centresdata")
        .subscribe(
            data => {
                this.form = data;                            
            },
            error => {});
  }
}
