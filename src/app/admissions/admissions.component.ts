import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, CrfService, DataService } from '../_services/index';
import { MatSnackBar } from '@angular/material';
import { Crf } from '../_models/index';

@Component({
  selector: 'app-admissions',
  templateUrl: './admissions.component.html',
  styleUrls: ['./admissions.component.css']
})
export class AdmissionsComponent implements OnInit {

  id:string;
  model:any={};
  form: Crf;
  admissionList: any=[];
  admissionId: string;
  unsaved: boolean = false;
  filterByStatusOptions = ['All', 'Errors', 'Uncomplete'];
  filterByStatusSelected = 'All';
  filterByText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private crfService: CrfService,
    private dataService: DataService,
    private alertService: AlertService,
    public snackBar: MatSnackBar) { 
      this.dataService.setCollectionName("admissionsdata");      
    }


    ngOnInit() {
      this.route.params.subscribe(
        (params : any) => {
           this.id = params["id"]; 
           this.getcrf();
           this.loadAdmissionsList();   
        }
     );     
    }

    filteredRecord(admission, filterType:string){
      var state:boolean = true;
      var text:boolean = admission.customId.indexOf(this.filterByText) > -1 || this.filterByText == undefined || this.filterByText.length == 0;
      
      if (filterType=="Uncomplete"){
        state = admission.complete != true;
      }
      else if (filterType=="Errors"){
        state = admission.hasErrors;
      }
      return state && text;
    }

    loadAdmissionsList(){
      var letExit = true;
      if (this.unsaved){
        letExit = window.confirm('Data have been modified. Do you really want to exit?');
      }
      if (this.unsaved == false || letExit){
        this.admissionId = undefined;
        this.dataService.getCollection(this.id).subscribe(
          data => {
            this.admissionList = data;
          }, 
          error =>{
            console.log("uff");
          });
      }
    }


    loadAdmission(admissionId: string){
      this.admissionId = admissionId;
      this.dataService.getByIdFromCollection(this.id, this.admissionId).subscribe(
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

    saveAdmission(){
      //this.setUnCompletedSection();
      if (this.model.userid){
        this.dataService.update(this.model).subscribe(
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
        this.dataService.create(this.model).subscribe(
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
      this.crfService.getCrf("admissionsdata")
          .subscribe(
              data => {
                  this.form = data;
                  //this.setUnCompletedSection();                
              },
              error => {
                  
          });
    }       

}
