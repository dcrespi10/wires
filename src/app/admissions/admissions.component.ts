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
  moduleInstance: string;
  filterByStatusOptions = ['All', 'Errors', 'Uncomplete', 'Deleted'];
  centresDataCompleted: boolean = false;
  moduleLabels = {
    "wires": "Wires",
    "openabdomen": "Open Abdomen",
    "infections": "IAI",
    "causticingestiondatabase": "Caustic Ingestion Database"
  }
  filterByStatusSelected = 'All';
  filterByText: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private crfService: CrfService,
    private dataService: DataService,
    private centresDataService: DataService,
    private alertService: AlertService,
    public snackBar: MatSnackBar) { 
      this.centresDataService.setCollectionName("centresdata");    
    }


    ngOnInit() {
      this.route.params.subscribe(
        (params : any) => {
           this.id = params["id"]; 
           this.moduleInstance = params["module"]; 
           //this.update();
           this.centresDataAreCompleted();
           this.dataService.setCollectionName("admissionsdata");  
           this.getcrf();
           this.loadAdmissionsList();   
        }
     );     
    }

    centresDataAreCompleted(){
      this.centresDataService.getCollection(this.id, "centre").subscribe(
        data => {
          for (var index in data){
            if (data[index].complete == true){
              this.centresDataCompleted = true;
              break;
            }
          }
        }, 
        error =>{
          console.log("uff");
        });
    }

    loadAdmissionsList(){
      var letExit = true;
      if (this.unsaved){
        letExit = window.confirm('Data have been modified. Do you really want to exit?');
      }
      if (this.unsaved == false || letExit){
        this.admissionId = undefined;
        this.dataService.getCollection(this.id, this.moduleInstance).subscribe(
          data => {
            this.admissionList = data;
            console.log(data);
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

    deleteAdmission(){
      if (this.model.userid){
        this.model.deleted = true;
        this.saveAdmission();
      }
      this.loadAdmissionsList();
    }

    restoreAdmission(){
      this.model.deleted = false;
      this.saveAdmission();
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
      this.crfService.getCrf(this.moduleInstance)
          .subscribe(
              data => {
                  this.form = data;
                  console.log(data);
                  //this.setUnCompletedSection();                
              },
              error => {
                  
          });
    }  
    
    
    update(){
    //FIXME: method should be used only in another place (specifical page to update crf definitions)
    /*
    var crfNew = {};  
    this.crfService.update(crfNew)
          .subscribe(
              data => {
                  
              },
              error => {
                  
          });
    */
    }

}
