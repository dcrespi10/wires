import { Component, OnInit, Input } from '@angular/core';
import { AlertService, AuthenticationService, CrfService, DataService } from '../_services/index';

@Component({
  selector: 'single-admission',
  templateUrl: './single-admission.component.html',
  styleUrls: ['./single-admission.component.css']
})
export class SingleAdmissionComponent implements OnInit {

  @Input() admissionid: string;
  @Input() userid: string;
  @Input() form: any;
  model: any = {};
  uncompletedPages:any=[];
  visibilities={};
  id:any;
  
  constructor(private dataService: DataService) {
    this.dataService.setCollectionName("admissionsdata");
  }

  ngOnInit() {
    this.loadAdmission();
  }

  loadAdmission(){
    
    this.dataService.getByIdFromCollection(this.userid, this.admissionid).subscribe(
      data => {
        this.model = data;
      }, 
      error =>{
        console.log("uff");
      });   
  }
  visibilityCheck(variableName, visibility){
    if (visibility === undefined){
      this.visibilities[variableName] = true;
    }else{
      this.visibilities[variableName] = eval(visibility);
    }
    return this.visibilities[variableName];
  }

  save(){
    //this.setUnCompletedSection();
    if (this.model.userid){
      this.dataService.update(this.model).subscribe(
        data => {
          console.log("yay");
        },
        error => {
          console.log("ouch");
        }
      );
    }else{
      this.model.userid = this.id;
      this.dataService.create(this.model).subscribe(
        data => {
          console.log("yay");
        },
        error => {
          console.log("ouch");
        }
      );
    }
    
  }


}
