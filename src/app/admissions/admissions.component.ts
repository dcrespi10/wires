import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, CrfService, DataService } from '../_services/index';
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private crfService: CrfService,
    private dataService: DataService,
    private alertService: AlertService) { 
      this.dataService.setCollectionName("admissionsdata");      
    }


    ngOnInit() {
      this.route.params.subscribe(
        (params : any) => {
           this.id = params["id"]; 
           this.getcrf();
           this.dataService.getCollection(this.id).subscribe(
            data => {
              this.admissionList = data;
            }, 
            error =>{
              console.log("uff");
            });   
        }
     );
     
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
